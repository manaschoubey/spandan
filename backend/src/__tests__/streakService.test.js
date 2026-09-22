// Unit tests for the streak bonus formula in backend/src/services/streakService.js
//
// This tests the pure logic — the bonus-tier thresholds — directly, matching the
// convention used by the other backend test files (see msqCorrectness.test.js,
// authRoutes.test.js): test the calculation, not the DB round-trip.
//
// The DB-touching parts of streakService (updateStreak's findOneAndUpdate upsert,
// getRoomStreaks) are exercised end-to-end by the manual QA checklist instead.

import { calculateBonus } from '../services/streakService.js'

describe('streakService — calculateBonus', () => {
  describe('below the first threshold (streak < 3)', () => {
    it('returns 0 for streak 0', () => {
      expect(calculateBonus(0)).toBe(0)
    })

    it('returns 0 for streak 1', () => {
      expect(calculateBonus(1)).toBe(0)
    })

    it('returns 0 for streak 2', () => {
      expect(calculateBonus(2)).toBe(0)
    })
  })

  describe('at the +2 threshold (3 <= streak < 5)', () => {
    it('returns 2 for streak 3', () => {
      expect(calculateBonus(3)).toBe(2)
    })

    it('returns 2 for streak 4', () => {
      expect(calculateBonus(4)).toBe(2)
    })
  })

  describe('at the +5 threshold (streak >= 5)', () => {
    it('returns 5 for streak 5', () => {
      expect(calculateBonus(5)).toBe(5)
    })

    it('returns 5 for streak 6', () => {
      expect(calculateBonus(6)).toBe(5)
    })

    it('returns 5 for streak 10', () => {
      expect(calculateBonus(10)).toBe(5)
    })

    it('returns 5 for very large streaks (caps, never grows unbounded)', () => {
      expect(calculateBonus(1000)).toBe(5)
    })
  })

  describe('boundaries', () => {
    it('never returns a negative bonus', () => {
      expect(calculateBonus(0)).toBeGreaterThanOrEqual(0)
      expect(calculateBonus(1)).toBeGreaterThanOrEqual(0)
      expect(calculateBonus(2)).toBeGreaterThanOrEqual(0)
    })

    it('bonus never exceeds the top tier (5)', () => {
      for (let s = 0; s <= 100; s++) {
        expect(calculateBonus(s)).toBeLessThanOrEqual(5)
      }
    })

    it('bonus is monotonic (never decreases as streak grows)', () => {
      for (let s = 0; s < 100; s++) {
        expect(calculateBonus(s + 1)).toBeGreaterThanOrEqual(calculateBonus(s))
      }
    })
  })
})