"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { useState, type ReactNode } from "react"

import { Toaster } from "@/components/ui/sonner"
import { createQueryClient } from "@/lib/query-client"

/**
 * Client-side providers for the whole app.
 * The query client is created once per browser session. `useState` keeps that
 * instance stable without branching on `window`, which would break hydration.
 * ThemeProvider is fixed to light so the directory has one consistent look.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(createQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" forcedTheme="light" enableSystem={false}>
        {children}
        <Toaster position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
