import { Skeleton } from "@/components/ui/skeleton"

/** Placeholder that matches the profile card. */
export function UserDetailSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
      <Skeleton className="h-12 w-64" />
      <Skeleton className="h-24 w-full" />
    </div>
  )
}
