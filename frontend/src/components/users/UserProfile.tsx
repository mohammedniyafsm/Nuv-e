import  { useEffect, useState } from 'react'
import { fetchUser, updateUser } from '../../features/User/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';

function UserProfile() {

    const dispatch = useDispatch<AppDispatch>();
    const [edit, setEdit] = useState(false);
    const { username, email, _id } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(()=>{
        setUser({email,username})
    },[username,email])


    const [user, setUser] = useState({
        username : "",
        email :"",
    });

    const handleSubmit = () => {
        dispatch(updateUser(user));
        setEdit((prev)=>!prev)
    };


    return (
        <section className="bg-white w-full rounded-xl border border-[#dbdada] px-8 py-8 mt-12 h-96 transition-all duration-500">
            <h1 className="font-neogroteskessalt-light">Personal Information</h1>

            {edit ? (
                // EDIT MODE
                <div className="grid grid-cols-2 gap-4 mt-8">
                    {/* User ID */}
                    <div>
                        <label className="font-neogrotesk-regular text-sm">User ID</label>
                        <input
                            className="w-[530px] mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9 px-4"
                            type="text"
                            value={_id}
                            disabled
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label className="font-neogrotesk-regular text-sm">First Name</label>
                        <input
                            className="w-[530px] mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9 px-4"
                            type="text"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="font-neogrotesk-regular text-sm">Email</label>
                        <input
                            className="w-[530px] mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9 px-4"
                            type="text"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end pt-36 gap-4">
                        <button
                            onClick={() => setEdit(false)}
                            className="h-10 w-22 border border-[#ececf0] rounded-xl text-black font-neogrotesk-regular text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="h-10 w-36 bg-black rounded-xl text-white font-neogrotesk-regular text-sm"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            ) : (
                // VIEW MODE
                <>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        {/* User ID */}
                        <div>
                            <label className="font-neogrotesk-regular text-sm">User ID</label>
                            <input
                                className="w-[530px] mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9 px-4"
                                type="text"
                                value={_id}
                                disabled
                            />
                        </div>

                        {/* Username */}
                        <div>
                            <label className="font-neogrotesk-regular text-sm">First Name</label>
                            <input
                                className="w-[530px] mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9 px-4"
                                type="text"
                                value={username}
                                disabled
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="font-neogrotesk-regular text-sm">Email</label>
                            <input
                                className="w-[530px] mt-2 text-sm bg-[#ececf0] rounded-xl font-neogrotesk-ultralight h-9 px-4"
                                type="text"
                                value={email}
                                disabled
                            />
                        </div>
                    </div>

                    {/* Edit Button */}
                    <div className="flex justify-end pt-20 gap-4">
                        <button
                            onClick={() => setEdit(true)}
                            className="h-10 w-22 bg-black rounded-xl text-white font-neogrotesk-regular text-sm"
                        >
                            Edit
                        </button>
                    </div>
                </>
            )}
        </section>
    )
}

export default UserProfile
