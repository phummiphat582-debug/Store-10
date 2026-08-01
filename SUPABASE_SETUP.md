# Store-10 Supabase setup

Store-10 now uses its own Supabase project instead of Firebase.

- Project name: `Store-10`
- Project ref: `kpzohxkumnzwbthclnvm`
- URL: `https://kpzohxkumnzwbthclnvm.supabase.co`
- Region: Southeast Asia (Singapore)

## Create the first admin

1. Open Supabase Dashboard and select the `Store-10` project.
2. Open **Authentication → Users → Add user**.
3. Create an email/password account.
4. Copy the new user's UUID.
5. Open **Table Editor → profiles → Insert row**.
6. Set `id` to that UUID, `email` to the user's email, and `role` to `admin`.

Additional users can use `role = viewer` for stock read-only access.

## Access rules

- `admin`: can manage items, issue history, departments, categories, and images.
- `viewer`: can read stock items and metadata only.
- History is restricted to admins.

The public browser key is intentionally used in `index.html`; database protection is provided by Row Level Security (RLS). Never put a Supabase secret key in the browser or commit it to Git.

## Migration note

The old Firebase project contains data from another app. Store-10 migration must only use Store-10 data or a Store-10 backup file; the app does not import the other app's root collections.
