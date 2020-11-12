import { IPostDoc, IPostRevision } from "@/interfaces/IModelPost";
import { User } from "@/models/User";
import { Visibility } from "@/models/Visibility";
import * as mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: User },
  visibility: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Visibility,
  },
  revisions: {
    default: () => [],
    required: true,
    type: [
      {
        richTextContent: {
          type: mongoose.Schema.Types.String,
          required: true,
          minlength: 1,
        },
        revTime: {
          type: mongoose.Schema.Types.Date,
          required: true,
          default: Date.now,
        },
        revBy: {
          ref: User,
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
      },
    ],
  },
  createTime: {
    type: mongoose.Schema.Types.Date,
    required: true,
    default: Date.now,
  },
});

PostSchema.methods.addRevision = function (
  this: IPostDoc,
  { richTextContent }: IPostRevision,
) {
  this.revisions.push({
    richTextContent,
    revTime: Date.now(),
    revBy: this.user,
  });
};

PostSchema.methods.publicJSON = async function (this: IPostDoc) {
  const { _id, user, createTime, revisions } = await this.populate({
    path: "user",
    select: "username -_id",
  })
    .populate({
      path: "revisions",
      populate: { path: "revBy", select: "username -_id" },
      select: "username -_id",
    })
    .execPopulate();
  return {
    _id,
    user,
    createTime,
    postContent: revisions[revisions.length - 1],
    isRevised: revisions.length > 1,
  };
};

PostSchema.pre("save", function (this: IPostDoc) {
  this.revisions = this.revisions.map(({ revBy, ...rest }) => ({
    revBy: revBy ?? this.user,
    ...rest,
  }));
});

export { PostSchema };

export const Post = mongoose.model<IPostDoc>("Post", PostSchema);
