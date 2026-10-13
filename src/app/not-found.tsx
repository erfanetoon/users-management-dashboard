import Link from "next/link"

import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"

/** Shown when a route does not exist. Unknown user ids use the API error state instead. */
export default function NotFound() {
  return (
    <div className="flex flex-col items-start gap-6">
      <PageHeader
        eyebrow="404"
        title="This page is not in the directory."
        description="The link may be outdated. Head back to the overview."
      />
      <Button asChild>
        <Link href="/">Back to overview</Link>
      </Button>
    </div>
  )
}
