import mongoose, { Schema, Document } from "mongoose";

export interface IErrorLog extends Document {
  message: string;
  stack: string;
  route: string;
  method: string;
  timestamp: Date;
}

const ErrorLogSchema: Schema<IErrorLog> = new Schema({
  message: { type: String, required: true },
  stack: { type: String, required: true },
  route: { type: String, required: true },
  method: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IErrorLog>("ErrorLog", ErrorLogSchema);
