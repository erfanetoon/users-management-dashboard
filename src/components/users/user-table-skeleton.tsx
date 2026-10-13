import { Skeleton } from "@/components/ui/skeleton"

/** Placeholder rows that match the people table so loading does not shift the page. */
export function UserTableSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
      {Array.from({ length: 6 }, (_, index) => (
        <Skeleton key={index} className="h-12 w-full" />
      ))}
    </div>
  )
}
