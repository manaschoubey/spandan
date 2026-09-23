import { updateStreak } from "../services/streakService.js";
import RoomStreak from "../models/RoomStreak.js";
import mongoose from "mongoose";

describe("streakService", () => {
  const roomId    = new mongoose.Types.ObjectId();
  const studentId = new mongoose.Types.ObjectId();

  afterEach(async () => {
    await RoomStreak.deleteMany({});
  });

  it("increments streak on correct answers", async () => {
    await updateStreak({ roomId, studentId, isCorrect: true });
    const result = await updateStreak({ roomId, studentId, isCorrect: true });
    expect(result.currentStreak).toBe(2);
  });

  it("resets streak on a wrong answer", async () => {
    await updateStreak({ roomId, studentId, isCorrect: true });
    await updateStreak({ roomId, studentId, isCorrect: true });
    const result = await updateStreak({ roomId, studentId, isCorrect: false });
    expect(result.currentStreak).toBe(0);
  });

  it("awards bonus points only at streak thresholds", async () => {
    for (let i = 0; i < 2; i++) await updateStreak({ roomId, studentId, isCorrect: true });
    const at3 = await updateStreak({ roomId, studentId, isCorrect: true });
    expect(at3.bonusPoints).toBe(2);
  });
});