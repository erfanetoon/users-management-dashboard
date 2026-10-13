import { CreateUserScreen } from "@/features/users/screens/create-user-screen"

export const metadata = {
  title: "Add person",
}

/** Create route. The screen is a client form and does not wait on a query. */
export default function NewUserPage() {
  return <CreateUserScreen />
}
