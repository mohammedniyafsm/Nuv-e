import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  status: string; // "active" | "banned"
}

function AllUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
          { withCredentials: true }
        );
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users", error);
        toast.error("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  // Handle block/unblock
  const handleStatusChange = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "banned" : "active";

    try {
      const r = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
console.log(r)
      setUsers(prev =>
        prev.map(user =>
          user._id === id ? { ...user, status: newStatus } : user
        )
      );
      toast.success(
        `User ${newStatus === "active" ? "unblocked" : "blocked"} successfully!`
      );
    } catch (error) {
      console.error("Error updating user status", error);
      toast.error("Failed to update status");
    }
  };

  const filteredUsers = users.filter(
    u =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="px-8 py-1">
      <div className="mt-10">
        <h1 className="text-xl font-neogrotesk-bold">Users</h1>
        <h1 className="text-[#6b6b6b] font-neogrotesk-ultralight pt-2">
          Manage your customer base
        </h1>

        <div className="w-full">
          <input
            className="mt-6 bg-white px-6 h-10 w-full rounded-xl"
            type="text"
            placeholder="Search Users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <section className="mt-6 pb-10">
        <div className="bg-white rounded-2xl border border-[#dbdada] px-10">
          <div className="flex font-neogrotesk-regular pl-18 border-b pb-3 border-[#dbdada] mt-6">
            <div className="flex gap-56">
              <h1>User</h1>
              <h1>Email</h1>
              <h1>Joined</h1>
            </div>
            <div className="flex gap-14 pl-24">
              <h1>Status</h1>
              <h1 className="pl-4">Actions</h1>
            </div>
          </div>

          {filteredUsers.map(user => (
            <div
              key={user._id}
              className="flex border-b pb-3 text-sm pl-2 text-center border-[#dbdada] pt-2 items-center"
            >
              <h1 className="w-40">{user.username}</h1>
              <h1 className="w-64 ml-14">{user.email}</h1>
              <h1 className="w-40 ml-16">
                {new Date(user.createdAt).toLocaleDateString()}
              </h1>

              {/* Status */}
              <button
                className={`ml-6 h-6 w-20 rounded-md text-xs ${
                  user.status === "active"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-300 text-red-50"
                }`}
              >
                {user.status === "active" ? "Active" : "Blocked"}
              </button>

              {/* Block/Unblock Action */}
              <button
                onClick={() => handleStatusChange(user._id, user.status)}
                className="ml-12 h-6 w-20 rounded-md bg-gray-200 text-gray-800 text-xs hover:bg-gray-300"
              >
                {user.status === "active" ? "Block" : "Unblock"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default AllUser;
