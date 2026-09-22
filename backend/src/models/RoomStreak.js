import mongoose from "mongoose";

const roomStreakSchema = new mongoose.Schema(
  {
    room:          { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    student:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    currentStreak: { type: Number, default: 0 },
    bestStreak:    { type: Number, default: 0 },
  },
  { timestamps: true }
);

roomStreakSchema.index({ room: 1, student: 1 }, { unique: true });

export default mongoose.model("RoomStreak", roomStreakSchema);