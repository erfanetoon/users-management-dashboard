import { Suspense } from "react"

import { StatsGridSkeleton } from "@/components/dashboard/stats-grid-skeleton"
import { DashboardScreen } from "@/features/users/screens/dashboard-screen"

export const metadata = {
  title: "Overview",
}

/**
 * Overview route.
 * The Suspense boundary is required because the screen reads a TanStack Query
 * during the first render, and Cache Components cannot prerender that work.
 */
export default function OverviewPage() {
  return (
    <Suspense fallback={<StatsGridSkeleton />}>
      <DashboardScreen />
    </Suspense>
  )
}
