import { JWT_SECRET } from "@/config/security";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export const AccountSchemaDefinition: mongoose.SchemaDefinition = {
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is valid"],
    index: true,
  },
  privateInfo: {
    hash: String,
    salt: String,
  },
};

const getHash = (password: string, salt: string) => {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex");
};

export const getAccountSchema = (extra?: mongoose.SchemaDefinition) => {
  const schema = new mongoose.Schema(AccountSchemaDefinition);
  schema.plugin(uniqueValidator, { message: "is already taken." });
  schema.methods.validPassword = function (this: AccountDoc, password: string) {
    return this.privateInfo.hash === getHash(password, this.privateInfo.salt);
  };
  schema.methods.setPassword = function (this: AccountDoc, password: string) {
    this.privateInfo.salt = crypto.randomBytes(16).toString("hex");
    this.privateInfo.hash = getHash(password, this.privateInfo.salt);
  };
  schema.methods.generateJWT = function (
    this: AccountDoc,
    options: jwt.SignOptions = { expiresIn: "2 days" },
  ) {
    return jwt.sign(
      {
        data: {
          id: this._id,
          username: this.username,
        },
      },
      JWT_SECRET,
      { ...options },
    );
  };
  schema.methods.toAuthJSON = function (this: AccountDoc) {
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
  privateInfo: {
    hash: string;
    salt: string;
  };
  validPassword: (password: string) => boolean;
  setPassword: (password: string) => void;
  generateJWT: (options?: jwt.SignOptions) => string;
  toAuthJSON: () => { username: string; token: string };
}
