import crypto from "crypto";

export class UserService {
  static getRandomSalt() {
    return crypto.randomBytes(16).toString("hex");
  }
  static encryptPassword(password: string, salt: string) {
    return crypto
      .pbkdf2Sync(password, salt, 10000, 512, "sha512")
      .toString("hex");
  }
  static validPassword(hashedPassword: string, salt: string, password: string) {
    return (
      hashedPassword && this.encryptPassword(password, salt) === hashedPassword
    );
  }
}
