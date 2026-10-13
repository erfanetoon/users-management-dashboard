# Harbor

People directory for a small team. Search, filter, create, edit, and remove people. The data lives in a local JSON file so the demo works without a database.

## Stack

- Next.js App Router and TypeScript
- Tailwind CSS and shadcn/ui
- Zod for validation, shared by the form and the API
- React Hook Form for the create and edit forms
- TanStack Query for client requests, cache, and mutations

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The first API call writes `data/users.json` from the seed list. That file is gitignored. Delete it to restore the seed. Restarting the dev server does not wipe it.

## Routes

| Route | What it does |
| --- | --- |
| `/` | Counts and the newest people |
| `/users` | Searchable directory |
| `/users/new` | Create form |
| `/users/[userId]` | Profile |
| `/users/[userId]/edit` | Edit form |
| `/api/users` | List and create |
| `/api/users/[userId]` | Read, update, and delete |

List filters are query params: `search`, `role` (`admin`, `manager`, `member`), and `status` (`active`, `invited`, `suspended`).

## How the code is split

UI does not fetch, and fetch code does not render.

```text
src/app              routes and API handlers only
src/components/ui    shadcn primitives
src/components       presentational pieces (table, form, badges, shells)
src/features/users   schemas, API client, query hooks, form hook, screens
src/server/users     file store and filtering
src/lib              query client and API errors
```

Screens in `src/features/users/screens` compose a hook and a presentational component. A component under `src/components` receives data and callbacks. It does not call `useQuery` or `useMutation`.

`PageState` (`src/components/feedback/page-state.tsx`) is the wrapper for data pages. Pass it a TanStack Query result and it renders one of:

1. loading, while the query has no data yet
2. error, with a retry button
3. empty, when the page says the data has nothing to show
4. the data, through the render prop

A background refetch keeps the last data on screen. Unexpected render crashes go to `src/app/error.tsx` instead, so a bug does not look like a failed request.

Each data route also has a React `Suspense` boundary. This app uses Cache Components, and TanStack Query reads the current time when a query starts. The boundary lets that work stream instead of failing the prerender.

## Validation and cache

`src/features/users/schemas.ts` is imported by the form and the route handlers. The form uses `zodResolver`. The API runs the same schema and returns `fieldErrors`, which `useUserForm` puts back on the inputs. A duplicate email is `409` and highlights the email field.

Query keys live in `src/features/users/query-keys.ts`. The list key includes the filters, so each search is cached on its own. Mutations write the detail cache and invalidate every list, because a changed role or status can move a person between filtered views.

Client errors (`4xx`) are not retried. Repeating a validation failure will not make it succeed.

## Comments

Exported functions have a short note on what they are responsible for and any decision that is not obvious from the name. The notes are there so a reader can follow the layers without opening every call site.
