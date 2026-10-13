"use client"

import { ErrorState } from "@/components/feedback/error-state"

type AppErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Route error boundary for unexpected render failures.
 * Query failures do not land here. PageState renders those inside the page
 * so the navigation shell stays in place and the user can retry the request.
 */
export default function AppError({ error, reset }: AppErrorProps) {
  return (
    <ErrorState
      title="This page hit an unexpected error."
      error={error}
      onRetry={reset}
    />
  )
}
