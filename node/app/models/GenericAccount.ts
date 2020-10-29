import crypto from "crypto";
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/security";

export const AccountSchemaDefinition: mongoose.SchemaDefinition = {
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is valid"],
    index: true,
  },
  hash: String,
  salt: String,
};

const getHash = (password: string, salt: string) => {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex");
};

export const getAccountSchema = (extra?: mongoose.SchemaDefinition) => {
  const schema = new mongoose.Schema(AccountSchemaDefinition);
  schema.plugin(uniqueValidator, { message: "is already taken." });
  schema.methods.validPassword = function (password: string) {
    return this.hash === getHash(password, this.salt);
  };
  schema.methods.setPassword = function (password: string) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = getHash(password, this.salt);
  };
  schema.methods.generateJWT = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 2);
    return jwt.sign(
      {
        exp: exp.getTime() / 1000,
        data: {
          id: this._id,
          username: this.username,
        },
      },
      JWT_SECRET,
    );
  };
  schema.methods.toAuthJSON = function () {
    const { username } = this;
    return {
      username,
      token: this.generateJWT(),
    };
  };
  extra && schema.add(extra);
  return schema;
};

export interface AccountDoc extends mongoose.Document {
  username: string;
  hash: string;
  salt: string;
  validPassword: (password: string) => boolean;
  setPassword: (password: string) => void;
  generateJWT: () => string;
  toAuthJSON: () => any;
}
