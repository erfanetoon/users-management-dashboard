import type { ReactNode } from "react"

type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
}

/**
 * Title block used by every page.
 * The optional action sits beside the title on wide screens and stacks on small ones.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex max-w-2xl flex-col gap-2">
        {eyebrow ? (
          <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-heading text-3xl font-medium tracking-tight text-balance">
          {title}
        </h1>
        {description ? (
          <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
