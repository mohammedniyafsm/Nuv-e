import { useEffect, useState } from "react";
import { fetchUser, updateUser } from "../../features/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";

function UserProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const [edit, setEdit] = useState(false);
  const { username, email, _id } = useSelector((state: RootState) => state.user);

  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    setUser({ email, username });
  }, [username, email]);

  const handleSubmit = () => {
    dispatch(updateUser(user));
    setEdit(false);
  };

  return (
    <section className="bg-white w-full rounded-xl border border-[#dbdada] lg:mt-0  px-4 sm:px-6 md:px-8 py-8 mt-8 md:mt-12 min-h-[24rem] transition-all duration-500">
      <h1 className="font-neogroteskessalt-light text-base md:text-lg">
        Personal Information
      </h1>

      {edit ? (
        /* ---------- EDIT MODE ---------- */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {/* User ID */}
          <div>
            <label className="font-neogrotesk-regular text-sm">User ID</label>
            <input
              className="w-full mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9 px-4"
              type="text"
              value={_id}
              disabled
            />
          </div>

          {/* Username */}
          <div>
            <label className="font-neogrotesk-regular text-sm">First Name</label>
            <input
              className="w-full mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9 px-4"
              type="text"
              value={user.username}
              onChange={(e) =>
                setUser({ ...user, username: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="font-neogrotesk-regular text-sm">Email</label>
            <input
              className="w-full mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9 px-4"
              type="text"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end md:col-span-2 pt-6 gap-3 sm:gap-4">
            <button
              onClick={() => setEdit(false)}
              className="h-10 w-full sm:w-28 border border-[#ececf0] rounded-xl text-black font-neogrotesk-regular text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="h-10 w-full sm:w-36 bg-black rounded-xl text-white font-neogrotesk-regular text-sm"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        /* ---------- VIEW MODE ---------- */
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {/* User ID */}
            <div>
              <label className="font-neogrotesk-regular text-sm">User ID</label>
              <input
                className="w-full mt-2 text-sm bg-[#ececf0] rounded-xl  h-9 px-4"
                type="text"
                value={_id}
                disabled
              />
            </div>

            {/* Username */}
            <div>
              <label className="font-neogrotesk-regular text-sm">First Name</label>
              <input
                className="w-full mt-2 text-sm bg-[#ececf0] rounded-xl  h-9 px-4"
                type="text"
                value={username}
                disabled
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="font-neogrotesk-regular text-sm">Email</label>
              <input
                className="w-full mt-2 text-sm bg-[#ececf0] rounded-xl f h-9 px-4"
                type="text"
                value={email}
                disabled
              />
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex justify-end pt-8 md:pt-12 gap-4">
            <button
              onClick={() => setEdit(true)}
              className="h-10 w-full sm:w-28 bg-black rounded-xl text-white font-neogrotesk-regular text-sm"
            >
              Edit
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default UserProfile;
