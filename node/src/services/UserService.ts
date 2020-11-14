import crypto from "crypto";

export class UserService {
  static encryptPassword(password: string, salt: any) {
    return crypto.createHmac("sha1", salt).update(password).digest("hex");
  }
  static checkPassword(hashedPassword: string, salt: any, password: string) {
    return (
      hashedPassword && this.encryptPassword(password, salt) === hashedPassword
    );
  }
}
