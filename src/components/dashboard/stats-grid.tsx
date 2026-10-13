import type { UserDirectoryStats } from "@/features/users/lib/user-directory"

const statItems = [
  { key: "total", label: "People", hint: "In the directory" },
  { key: "active", label: "Active", hint: "Can be assigned work" },
  { key: "invited", label: "Invited", hint: "Waiting to join" },
  { key: "suspended", label: "Suspended", hint: "Access is paused" },
] as const

/**
 * Overview counts.
 * The numbers are calculated before this component renders, so the card
 * does not know how a status is counted.
 */
export function StatsGrid({ stats }: { stats: UserDirectoryStats }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {statItems.map((item) => (
        <article
          key={item.key}
          className="flex flex-col gap-2 rounded-xl bg-card px-4 py-4 ring-1 ring-foreground/10"
        >
          <p className="text-sm text-muted-foreground">{item.label}</p>
          <p className="font-heading text-3xl font-medium">{stats[item.key]}</p>
          <p className="text-xs text-muted-foreground">{item.hint}</p>
        </article>
      ))}
    </div>
  )
}
