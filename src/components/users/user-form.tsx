"use client"

import type { FormEvent } from "react"
import type { UseFormReturn } from "react-hook-form"
import { Controller } from "react-hook-form"
import Link from "next/link"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  userRoleLabels,
  userRoles,
  userStatusLabels,
  userStatuses,
} from "@/features/users/constants"
import type { UserFormValues, UserRole, UserStatus } from "@/features/users/schemas"

type UserFormProps = {
  form: UseFormReturn<UserFormValues>
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  submitLabel: string
  isSubmitting: boolean
  cancelHref: string
}

const textFields = [
  { name: "firstName", label: "First name", placeholder: "Amira" },
  { name: "lastName", label: "Last name", placeholder: "Soltani" },
  { name: "email", label: "Email", placeholder: "amira@harbor.example" },
  { name: "department", label: "Department", placeholder: "People" },
  { name: "jobTitle", label: "Job title", placeholder: "Head of People" },
] as const

function isUserRole(value: string): value is UserRole {
  return userRoles.some((role) => role === value)
}

function isUserStatus(value: string): value is UserStatus {
  return userStatuses.some((status) => status === value)
}

/**
 * Create and edit form.
 * It receives the form object from `useUserForm` and does not call the API.
 * `noValidate` lets Zod show the messages instead of the browser tooltip.
 */
export function UserForm({
  form,
  onSubmit,
  submitLabel,
  isSubmitting,
  cancelHref,
}: UserFormProps) {
  const rootError = form.formState.errors.root?.message

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
      {rootError ? (
        <Alert variant="destructive">
          <AlertTitle>Could not save</AlertTitle>
          <AlertDescription>{rootError}</AlertDescription>
        </Alert>
      ) : null}
      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          {textFields.map((textField) => (
            <Controller
              key={textField.name}
              control={form.control}
              name={textField.name}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`user-${textField.name}`}>
                    {textField.label}
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`user-${textField.name}`}
                    type={textField.name === "email" ? "email" : "text"}
                    placeholder={textField.placeholder}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          ))}
          <Controller
            control={form.control}
            name="role"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="user-role">Role</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    if (isUserRole(value)) field.onChange(value)
                  }}
                >
                  <SelectTrigger
                    id="user-role"
                    className="w-full"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Choose a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {userRoles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {userRoleLabels[role]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="status"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="user-status">Status</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    if (isUserStatus(value)) field.onChange(value)
                  }}
                >
                  <SelectTrigger
                    id="user-status"
                    className="w-full"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Choose a status" />
                  </SelectTrigger>
                  <SelectContent>
                    {userStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {userStatusLabels[status]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </div>
      </FieldGroup>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href={cancelHref}>Cancel</Link>
        </Button>
      </div>
    </form>
  )
}
