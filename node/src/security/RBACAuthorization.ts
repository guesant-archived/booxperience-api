const { RBAC } = require("rbac");

export class RBACAuthorization {
  roles: any;
  accessLevels: any;
  rbac: any;
  constructor() {
    this.roles = {
      guest: "Guest",
      basic: "BasicUser",
      admin: "AdminUser",
    };
    this.accessLevels = [
      {
        role: this.roles.guest,
        level: 10,
      },
      {
        role: this.roles.basic,
        level: 20,
      },
      {
        role: this.roles.admin,
        level: 30,
      },
    ];
    this.rbac = new (RBAC as any)(
      {
        roles: this.accessLevels.map((al: any) => al.role),
        permissions: {
          IndexController: ["index"],
          BooksListController: [
            "getBooks",
            "getBook",
            "removeBook",
            "rateBook",
          ],
        },
        grants: {
          Guest: [
            "index_IndexController",
            "getBooks_BooksListController",
            "getBook_BooksListController",
          ],
          BasicUser: ["Guest", "rateBook_BooksListController"],
          AdminUser: ["BasicUser", "removeBook_BooksListController"],
        },
      },
      (err: any) => {
        if (err) {
          throw err;
        }
      },
    );
  }
  getGuestAccessLevel() {
    return this.accessLevels.find((lvl: any) => lvl.role === this.roles.guest);
  }
  hasAccess(role: any, controller: any, action: any, cb: any) {
    this.rbac.can(role, action, controller, cb);
  }
  canAny(role: any, permissions: any, cb: any) {
    this.rbac.canAny(role, permissions, cb);
  }
  authorize(controller: any, action: any) {
    return (req: any, res: any, next: any) =>
      this.rbac.can(req.user.role, action, controller, (err: any, can: any) => {
        if (err) return next(err);
        if (!can) {
          const errorResponse: any = {
            error_description: {
              type: "access_denied",
              message: "Access denied",
            },
            accessLevel: undefined,
          };
          const accessLevel = this._minNeededAccessLevel(controller, action);
          if (accessLevel != null) {
            errorResponse.accessLevel = accessLevel;
          }
          return res.status(403).send(errorResponse);
        }
        next();
      });
  }

  _minNeededAccessLevel(controller: any, action: any) {
    const roles = this._whoCan(controller, action);
    const rolesAccessLevels = this.accessLevels
      .filter((al: any) => roles.includes(al.role))
      .map((al: any) => al.level);
    return rolesAccessLevels.length > 0 ? Math.min(...rolesAccessLevels) : null;
  }

  _whoCan(controller: any, action: any) {
    const rolesIncludePermission: any[] = [];
    this.rbac.getRoles((err: any, roles: any[]) => {
      if (err) throw err;
      roles.forEach((role) => {
        role.can(action, controller, (err2: any, can: any) => {
          if (err2) throw err2;
          if (can) {
            rolesIncludePermission.push(role.name);
          }
        });
      });
    });
    return rolesIncludePermission;
  }
}
