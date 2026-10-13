import type { ReactNode } from "react"

type EmptyStateProps = {
  title: string
  description: string
  action?: ReactNode
}

/**
 * Shown when a request succeeded but there is nothing to list.
 * The action is optional so a read-only empty state does not invent a button.
 */
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-xl bg-card px-6 py-10 ring-1 ring-foreground/10">
      <h2 className="font-heading text-xl font-medium">{title}</h2>
      <p className="max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      {action}
    </div>
  )
}
