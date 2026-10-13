import { Suspense } from "react"

import { UserFormSkeleton } from "@/components/users/user-form-skeleton"
import { EditUserScreen } from "@/features/users/screens/edit-user-screen"

export const metadata = {
  title: "Edit person",
}

/** Edit route. The screen loads the person, then mounts the form. */
export default function EditUserPage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  return (
    <Suspense fallback={<UserFormSkeleton />}>
      {params.then(({ userId }) => (
        <EditUserScreen userId={userId} />
      ))}
    </Suspense>
  )
}
