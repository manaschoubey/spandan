import RoomStreak from "../models/RoomStreak.js";

export function calculateBonus(streak) {
  if (streak >= 5) return 5;
  if (streak >= 3) return 2;
  return 0;
}

export async function updateStreak({ roomId, studentId, isCorrect }) {
  // Atomically upsert and compute the new current streak
  let record;
  if (isCorrect) {
    record = await RoomStreak.findOneAndUpdate(
      { room: roomId, student: studentId },
      { $inc: { currentStreak: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  } else {
    record = await RoomStreak.findOneAndUpdate(
      { room: roomId, student: studentId },
      { $set: { currentStreak: 0 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  }

  // Keep bestStreak up to date
  if (record.currentStreak > record.bestStreak) {
    record.bestStreak = record.currentStreak;
    await record.save();
  }

  const bonusPoints = isCorrect ? calculateBonus(record.currentStreak) : 0;

  return {
    currentStreak: record.currentStreak,
    bestStreak:    record.bestStreak,
    bonusPoints,
  };
}

export async function getRoomStreaks(roomId) {
  return RoomStreak.find({ room: roomId }).select("student currentStreak bestStreak");
}