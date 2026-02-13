import Link from "next/link";
import { verifySession, getUser } from "@/lib/dal";
import { logout } from "@/app/actions/auth";

export default async function DashboardPage() {
  const session = await verifySession();
  const user = await getUser();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          {/* Browse Product Button here */}
          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-50"
            >
              Browse Products
            </Link>

            {session.role === "admin" && (
              <Link
                href="/admin"
                className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-50"
              >
                Admin Panel
              </Link>
            )}

            <form action={logout}>
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </form>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Welcome back!</h2>

          {user && (
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong>{" "}
                <span className="capitalize">{user.role}</span>
              </p>
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full mt-4"
                />
              )}
            </div>
          )}

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Available Actions:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>View your profile</li>
              {session.role === "admin" && (
                <li>
                  <Link href="/admin" className="text-blue-600 hover:underline">
                    Access Admin Panel
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="/products"
                  className="text-blue-600 hover:underline"
                >
                  Browse Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-blue-600 hover:underline">
                  View Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
