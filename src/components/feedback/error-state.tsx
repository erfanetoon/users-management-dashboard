import { TriangleAlertIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { getErrorMessage } from "@/lib/api-error"

type ErrorStateProps = {
  title?: string
  error: unknown
  onRetry?: () => void
}

/**
 * Visible failure for a page section.
 * `onRetry` is optional because some callers, such as the route error boundary,
 * pass Next.js `reset` while others pass a TanStack Query refetch.
 */
export function ErrorState({
  title = "This page could not be loaded.",
  error,
  onRetry,
}: ErrorStateProps) {
  return (
    <Alert variant="destructive">
      <TriangleAlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{getErrorMessage(error)}</AlertDescription>
      {onRetry ? (
        <AlertAction>
          <Button type="button" variant="outline" size="sm" onClick={onRetry}>
            Try again
          </Button>
        </AlertAction>
      ) : null}
    </Alert>
  )
}
