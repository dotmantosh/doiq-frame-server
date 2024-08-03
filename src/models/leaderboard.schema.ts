import { Schema, model, Document, Types } from 'mongoose';

export interface LeaderBoardDocument extends Document {
  _id: string
  fid: string
  username: string
  createdAt: Date
  updatedAt: Date
}

const leaderBoardSchema = new Schema<LeaderBoardDocument>({
  fid: { type: String, required: true, trim: true },
  username: { type: String, required: true },
}, { timestamps: true })

export const LeaderBoardSchema = model<LeaderBoardDocument>('LeaderBoard', leaderBoardSchema);