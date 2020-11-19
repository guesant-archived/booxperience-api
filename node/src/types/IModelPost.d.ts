import * as mongoose from "mongoose";

export type IPostRevision = {
  richTextContent: mongoose.Schema.Types.String;
  revTime?: number;
  revBy: mongoose.Schema.Types.ObjectId;
};

export type IPostGeneric = {
  user: mongoose.Schema.Types.ObjectId;
  visibility: mongoose.Schema.Types.ObjectId;
  revisions: IPostRevision[];
  createTime: number;
  addRevision: ({
    richTextContent,
  }: {
    richTextContent: IPostRevision["richTextContent"];
  }) => void;
  publicJSON: () => Promise<{
    _id: string;
    user: IPostGeneric["user"];
    createTime: IPostGeneric["createTime"];
    postContent: IPostRevision;
    isRevised: boolean;
  }>;
};

export type IPostDoc = mongoose.Document & IPostGeneric;
