import { render, screen } from '@testing-library/react'
import StreakBadge from '../components/StreakBadge'

describe('StreakBadge', () => {
  describe('below the visible threshold (streak < 2)', () => {
    it('renders nothing for streak 0', () => {
      const { container } = render(<StreakBadge streak={0} />)
      expect(container).toBeEmptyDOMElement()
    })

    it('renders nothing for streak 1', () => {
      const { container } = render(<StreakBadge streak={1} />)
      expect(container).toBeEmptyDOMElement()
    })

    it('renders nothing when streak is undefined', () => {
      const { container } = render(<StreakBadge streak={undefined} />)
      expect(container).toBeEmptyDOMElement()
    })
  })

  describe('at or above the visible threshold (streak >= 2)', () => {
    it('renders the streak count for streak 2', () => {
      render(<StreakBadge streak={2} />)
      expect(screen.getByText('2')).toBeInTheDocument()
    })

    it('renders the streak count for streak 4', () => {
      render(<StreakBadge streak={4} />)
      expect(screen.getByText('4')).toBeInTheDocument()
    })

    it('renders the streak count for streak 5', () => {
      render(<StreakBadge streak={5} />)
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('shows the flame emoji', () => {
      render(<StreakBadge streak={3} />)
      expect(screen.getByText('🔥')).toBeInTheDocument()
    })
  })

  describe('hot streak tier (streak >= 5)', () => {
    it('uses the hot color (orange) at streak 5', () => {
      const { container } = render(<StreakBadge streak={5} />)
      const pill = container.querySelector('span')
      // rgba or hex converted by jsdom — the color-mix resolves against #ea580c for hot
      expect(pill.getAttribute('style')).toContain('234, 88, 12') // #ea580c in rgb form (may vary)
    })

    it('still renders the number at large streaks', () => {
      render(<StreakBadge streak={100} />)
      expect(screen.getByText('100')).toBeInTheDocument()
    })
  })

  describe('size prop', () => {
    it('defaults to sm', () => {
      const { container } = render(<StreakBadge streak={3} />)
      const pill = container.querySelector('span')
      expect(pill.getAttribute('style')).toContain('font-size: 11px')
    })

    it('accepts md size', () => {
      const { container } = render(<StreakBadge streak={3} size="md" />)
      const pill = container.querySelector('span')
      expect(pill.getAttribute('style')).toContain('font-size: 13px')
    })
  })
})