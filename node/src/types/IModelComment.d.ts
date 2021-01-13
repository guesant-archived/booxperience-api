import * as mongoose from "mongoose";

export type ICommentGeneric = {
  user: mongoose.Schema.Types.ObjectId;
  visibility: mongoose.Schema.Types.ObjectId;
  revisions: {
    richTextContent: mongoose.Schema.Types.String;
    revTime: mongoose.Schema.Types.Date;
  }[];
  createTime: mongoose.Schema.Types.Date;
  repplyTo: mongoose.Schema.Types.ObjectId;
  replies: mongoose.Schema.Types.ObjectId[];
};

export type ICommentDoc = mongoose.Document & ICommentGeneric;
