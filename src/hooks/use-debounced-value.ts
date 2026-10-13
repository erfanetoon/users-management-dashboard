"use client"

import { useEffect, useState } from "react"

/**
 * Returns the latest value only after it has stopped changing.
 * The timer resets whenever `value` changes, which is what makes a search box
 * wait for the user to pause.
 */
export function useDebouncedValue<TValue>(value: TValue, delayMs: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delayMs)

    return () => {
      window.clearTimeout(timer)
    }
  }, [value, delayMs])

  return debouncedValue
}
