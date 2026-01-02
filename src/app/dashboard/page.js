import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 text-center">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome, <span className="font-semibold">{session.user.name}</span>
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">1,245</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
            <p className="text-sm text-gray-500">Active Sessions</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">87</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
            <p className="text-sm text-gray-500">System Status</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              Online
            </p>
          </div>
        </div>

        {/* Activity */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>

          <ul className="list-none space-y-3 text-gray-700 text-center mx-auto max-w-md">
            <li>emilys logged in — Today</li>
            <li>michaelw viewed dashboard — Yesterday</li>
            <li>jamesd logged out — 2 days ago</li>
          </ul>
        </div>

        {/* Logout */}
        <div className="mt-10 flex justify-center">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
