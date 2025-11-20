import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  sno: number;
  title: string;
  desc?: string;
  completed: boolean;
  user?: string; // userId (optional)
}

const TodoSchema: Schema<ITodo> = new Schema(
  {
    sno: { type: Number, required: true },
    title: { type: String, required: true },
    desc: { type: String },
    completed: { type: Boolean, default: false },
    user: { type: String }, // or mongoose.Schema.Types.ObjectId if you have users
  },
  { timestamps: true }
);

export default mongoose.model<ITodo>("Todo", TodoSchema);
