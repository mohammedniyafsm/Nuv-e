import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../app/store'
import { fetchUser } from '../features/User/UserSlice';

function UserProfileHeader() {

  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch])

  const { username, email } = useSelector((state: RootState) => state.user);
  console.log(username,email)

  return (
    <div className='bg-[#ffff] w-full px-4 py-8 rounded-xl border border-[#dbdada]'>

      <div className="flex gap-8 items-center">
        <div className="">
          <img className='h-20 w-20 rounded-full' src="./public/images/1k.jpg" alt="" />
        </div>
        <div className="">
          <h1 >{username}</h1>
          <h1 className='text-[#8a7a7aed]'>{email}</h1>
          <h1 className='text-[#8a7a7aed]'>Member since March 2024</h1>
        </div>
      </div>


    </div>
  )
}

export default UserProfileHeader
