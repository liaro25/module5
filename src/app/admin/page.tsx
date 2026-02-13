import Link from "next/link";
import { requireRole } from "@/lib/dal";
import { logout } from "@/app/actions/auth"; // <- sesuaikan path kalau beda

export default async function AdminPage() {
  const session = await requireRole(["admin"]);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* TOP BAR */}
        <div className="mb-8 flex items-center justify-between gap-3">
          <h1 className="text-3xl font-bold">Admin Panel</h1>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              ← Back to Dashboard
            </Link>

            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Logout
              </button>
            </form>
          </div>
        </div>

        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg mb-6">
          <p className="font-semibold">⚠️ Admin Only Area</p>
          <p className="text-sm mt-1">
            Only users with the "admin" role can access this page.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Admin Actions</h2>
          <ul className="space-y-2">
            <li>1. Manage users</li>
            <li>2. View analytics</li>
            <li>3. System settings</li>
            <li>4. Content moderation</li>
            <li>
              ⚙️{" "}
              <a
                href="/admin/products"
                className="font-semibold text-blue-600 hover:underline"
              >
                Manage Products
              </a>
            </li>
          </ul>

          <div className="mt-6">
            <p>
              <strong>Current User:</strong> {session.email}
            </p>
            <p>
              <strong>Role:</strong> {session.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
