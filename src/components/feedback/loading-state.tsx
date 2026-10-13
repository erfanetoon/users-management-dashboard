import { Loader2Icon } from "lucide-react"

/**
 * Generic loading message.
 * Pages that know their layout pass a skeleton into PageState instead, so the
 * screen does not jump from a spinner to a completely different shape.
 */
export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div
      role="status"
      className="flex items-center gap-3 text-sm text-muted-foreground"
    >
      <Loader2Icon className="size-4 animate-spin" />
      <span>{label}</span>
    </div>
  )
}
