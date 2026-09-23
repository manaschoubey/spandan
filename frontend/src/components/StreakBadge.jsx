/**
 * Small pill showing a student's current answer streak.
 * Renders nothing below 2 — avoids cluttering rows for students without a meaningful streak.
 * Color shifts to a hotter orange at 5+ (the "hot streak" tier, matching the +5 bonus threshold).
 */
function StreakBadge({ streak, size = 'sm' }) {
  if (!streak || streak < 2) return null

  const isHot = streak >= 5
  const color = isHot ? '#ea580c' : '#d97706' // orange-600 / amber-600
  const fontSize = size === 'sm' ? '11px' : '13px'
  const padding = size === 'sm' ? '3px 8px' : '4px 10px'

  return (
    <span
      title={`${streak} correct in a row`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding,
        borderRadius: '999px',
        fontSize,
        fontWeight: 700,
        lineHeight: 1.2,
        background: `color-mix(in srgb, ${color} 16%, transparent)`,
        color,
        border: `1px solid color-mix(in srgb, ${color} 28%, transparent)`,
        whiteSpace: 'nowrap',
        flexShrink: 0
      }}
    >
      <span aria-hidden="true">🔥</span>
      <span>{streak}</span>
    </span>
  )
}

export default StreakBadge