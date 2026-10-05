import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { LiquidBookingModal } from '../components/sections/LiquidBookingModal';

/**
 * BookingContext
 * Single owner of the booking modal so every entry point (Hero CTA, Navbar CTA,
 * Counselling section switcher) opens the *same* window.
 *
 * Why this exists:
 * - Cal.com's embed binds via ONE delegated `document` click listener that resolves
 *   the nearest `[data-cal-link]` ancestor. So there must be exactly one Cal.com
 *   button in the DOM at a time, and it must never be nested inside another
 *   `[data-cal-link]` element. Keeping one modal instance guarantees that.
 * - Anything that wants to open booking calls `openBooking(type)` — it must NOT
 *   carry its own `data-cal-link`, or it would race the delegated resolver.
 */

const BookingContext = createContext(null);

const VALID_TYPES = new Set(['online', 'inperson']);

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionType, setSessionType] = useState('online');

  /**
   * `openBooking()` with no argument opens the last-selected session type, so the
   * Counselling switcher acts as a sticky preference for every other entry point.
   */
  const openBooking = useCallback((type) => {
    if (type === undefined) {
      setIsOpen(true);
      return;
    }
    setSessionType(VALID_TYPES.has(type) ? type : 'online');
    setIsOpen(true);
  }, []);

  const selectSessionType = useCallback((type) => {
    setSessionType(VALID_TYPES.has(type) ? type : 'online');
  }, []);

  const closeBooking = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, sessionType, openBooking, selectSessionType, closeBooking }),
    [isOpen, sessionType, openBooking, selectSessionType, closeBooking]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      <LiquidBookingModal
        isOpen={isOpen}
        onClose={closeBooking}
        defaultType={sessionType}
      />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBooking must be used inside a <BookingProvider>');
  }
  return ctx;
}