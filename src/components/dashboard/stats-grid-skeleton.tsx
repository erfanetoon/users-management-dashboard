import { Skeleton } from "@/components/ui/skeleton"

/** Placeholder cards for the overview while the directory query is pending. */
export function StatsGridSkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }, (_, index) => (
        <Skeleton key={index} className="h-28 w-full" />
      ))}
    </div>
  )
}
