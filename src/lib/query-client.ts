import { QueryClient } from "@tanstack/react-query"

import { isApiError } from "@/lib/api-error"

/**
 * Builds a TanStack Query client with the directory defaults.
 * Client errors (4xx) are not retried, because repeating them will not make
 * a validation or missing-record response succeed.
 *
 * Call this inside `useState` in the provider. A `window` check here would
 * render different markup on the server and in the browser.
 */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
        retry(failureCount, error) {
          if (isApiError(error) && error.status >= 400 && error.status < 500) {
            return false
          }

          return failureCount < 2
        },
      },
      mutations: {
        retry: false,
      },
    },
  })
}
