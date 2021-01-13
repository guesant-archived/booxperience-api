import { User } from "@/mock/User";
import { Visibility } from "@/mock/Visibility";
import { ICommentDoc } from "@/types/IModelComment";
import * as mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: User },
  visibility: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
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
      },
    ],
  },
  createTime: {
    type: mongoose.Schema.Types.Date,
    required: true,
    default: Date.now,
  },
  repplyTo: { type: mongoose.Schema.Types.ObjectId },
  replies: { type: [{ type: mongoose.Schema.Types.ObjectId }] },
});

export const Comment = mongoose.model<ICommentDoc>("Comment", CommentSchema);

CommentSchema.add({
  repplyTo: { type: mongoose.Schema.Types.ObjectId, ref: Comment },
  replies: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: Comment }] },
});
