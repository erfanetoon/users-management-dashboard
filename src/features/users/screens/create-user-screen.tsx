"use client"

import { PageHeader } from "@/components/layout/page-header"
import { CreateUserFormPanel } from "@/features/users/components/user-form-panel"

/**
 * Create screen.
 * There is no PageState here because the page does not load a person first.
 * The form reports its own validation and API errors.
 */
export function CreateUserScreen() {
  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <PageHeader
        eyebrow="People"
        title="Add a person"
        description="They are stored in the local directory and show up in the list right away."
      />
      <CreateUserFormPanel />
    </div>
  )
}
