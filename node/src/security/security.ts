import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as AnonymousStrategy } from "passport-anonymous";
import { BasicStrategy } from "passport-http";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { UserService } from "../services/UserService";
import { RBACAuthorization } from "./RBACAuthorization";

export class Security {
  repository: any;
  rbacAuthorization: RBACAuthorization;
  jwtSecret: any;
  constructor(repository: any, jwtSecret: any) {
    this.repository = repository;
    this.rbacAuthorization = new RBACAuthorization();
    this.jwtSecret = jwtSecret;
    this._setStrategies();
  }
  issueToken() {
    return [
      passport.authenticate("basic", {
        session: false,
      }),
      async (req: any, res: any) => {
        const { user } = req;
        const token = jwt.sign(
          {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          this.jwtSecret,
        );
        res.json(token);
      },
    ];
  }

  authenticate() {
    return [
      passport.authenticate(["jwt", "anonymous"], {
        session: false,
      }),
      (req: any, res: any, next: any) => {
        if (!req.user) {
          req.user = {
            role: this.rbacAuthorization.getGuestAccessLevel().role,
          };
        }

        next();
      },
    ];
  }

  authorise(controller: any, action: any) {
    return this.rbacAuthorization.authorize(controller, action);
  }

  hasAccess(role: any, controller: any, action: any, cb: any) {
    return this.rbacAuthorization.hasAccess(role, controller, action, cb);
  }

  canAny(role: any, permissions: any, cb: any) {
    return this.rbacAuthorization.canAny(role, permissions, cb);
  }

  _setStrategies() {
    passport.use(new AnonymousStrategy());
    passport.use(
      new BasicStrategy((email, password, done) => {
        let user;
        try {
          user = this.repository.user.getByEmail(email);

          if (!user) return done(null, false);

          if (
            !UserService.checkPassword(user.hashedPassword, user.salt, password)
          ) {
            return done(null, false);
          }

          done(null, user);
        } catch (err) {
          done(err);
        }
      }),
    );

    passport.use(
      new JwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: this.jwtSecret,
        },
        (user, done) => done(null, user),
      ),
    );
  }
}
