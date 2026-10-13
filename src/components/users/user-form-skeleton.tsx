import { Skeleton } from "@/components/ui/skeleton"

/** Placeholder for the create and edit forms while a person is loading. */
export function UserFormSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {Array.from({ length: 6 }, (_, index) => (
        <Skeleton key={index} className="h-16 w-full" />
      ))}
    </div>
  )
}
