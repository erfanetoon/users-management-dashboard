"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { DeleteUserDialog } from "@/components/users/delete-user-dialog"
import { useDeleteUserMutation } from "@/features/users/mutations"
import { formatUserName } from "@/features/users/lib/format-user"
import type { User } from "@/features/users/schemas"
import { getErrorMessage } from "@/lib/api-error"

type DeleteUserButtonProps = {
  user: User
  /**
   * Keep the current page after a successful delete.
   * The people table uses this because the list query refresh removes the row.
   * The profile page leaves it unset and returns to the directory.
   */
  stayOnPage?: boolean
  size?: "sm" | "default"
}

/**
 * Remove action plus its confirmation dialog.
 * The button owns the mutation so the table and profile only pass the person.
 */
export function DeleteUserButton({
  user,
  stayOnPage = false,
  size = "default",
}: DeleteUserButtonProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const mutation = useDeleteUserMutation()
  const userName = formatUserName(user)

  async function handleConfirm() {
    try {
      await mutation.mutateAsync(user.id)
      toast.success(`${userName} was removed.`)
      setOpen(false)

      if (!stayOnPage) {
        router.push("/users")
      }
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="destructive"
        size={size}
        onClick={() => setOpen(true)}
      >
        Remove
      </Button>
      <DeleteUserDialog
        open={open}
        userName={userName}
        isDeleting={mutation.isPending}
        onOpenChange={setOpen}
        onConfirm={() => {
          void handleConfirm()
        }}
      />
    </>
  )
}
