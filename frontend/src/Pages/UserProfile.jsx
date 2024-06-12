import React, { useEffect } from 'react'
import { useSelector, } from "react-redux"
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom"

const UserProfile = () => {

    const user = useSelector(state => state.user.user)

    return (
        <div className="min-h-[calc(120vh-120px)] md:flex hidden">

            <aside className='bg-white min-h-full w-full max-w-60 shadow-lg'>

                <div className='h-40 bg-red-500 flex justify-center items-center flex-col'>

                    <div className='cursor-pointer flex justify-center mt-3' onClick={() => setMenuDisplay(preve => !preve)}>
                        {
                            user.profileImage ? (
                                <img src={user.profileImage} className='w-14 h-14 rounded-full' alt={user.name}></img>
                            ) : (
                                <FaRegUserCircle fontSize={45} />
                            )
                        }
                    </div>

                    <p className='mt-1 pb-1 text-lg font-semibold capitalize text-md'>{user?.name}</p>
                    <p className='pb-3 text-white font-semibold text-sm'>{user.role}</p>

                </div>

                {/* navigation */}
                <div>
                    <nav className="flex flex-col gap-4 px-4 pt-5 font-semibold text-lg">
                        <Link to="myorders" className='hover:bg-slate-100 p-2'>My Orders</Link>
                        <Link to="settings" className='hover:bg-slate-100 p-2'>Settings</Link>
                        <Link to="/" className='hover:bg-slate-100 p-2'>Home</Link>
                    </nav>
                </div>

            </aside>

            <main class="w-full h-full p-2">
                <Outlet></Outlet>
            </main>

        </div>
    )
}

export default UserProfile