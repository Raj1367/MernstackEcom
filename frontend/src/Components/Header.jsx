import React, { useContext, useEffect, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch, } from "react-redux"
import SummaryApi from '../Common';
import { setUserDetails } from '../ReduxToolkit/Features/UserSlice';
import { toast } from 'react-toastify'
import Role from '../Common/Role';
import Context from '../Context';
const Header = () => {

  

  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchInput=useLocation()
  const URLsearch=new URLSearchParams(searchInput?.search)
  const searchQuery=URLsearch.getAll("q")
  const [search,setSearch]=useState(searchQuery)

  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)

  console.log("search input",searchInput?.search.split("=")[0])

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logoutUser.url, {
      method: SummaryApi.logoutUser.method,
      credentials: 'include'
    })

    const data = await fetchData.json()

    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(""))
      navigate("/")
    }

    if (data.error) {
      toast.error(data.message)
    }

  }

  console.log("handle count", context)

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)
    if (value) {
      navigate(`/searchproduct?q=${value}`)
    }
    else {
      navigate("/")
    }
  }


  return (
    <div>
      <header className='h-16 shadow-md bg-white fixed w-full z-40'>
        <div className="h-full container mx-auto flex items-center px-4 justify-between">

          <div>
            <Link to="/">
              <Logo w={90} h={50}></Logo>
            </Link>
          </div>

          <div className="hidden md:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
            <input className='w-full outline-none' type="text" placeholder='search products here...' onChange={handleSearch} value={search} />
            <div className='text-lg min-w-[50px] bg-red-600 h-8 flex items-center justify-center rounded-r-full text-white'>
              <GrSearch />
            </div>
          </div>


          <div className='flex items-center gap-8'>

            <div className="relative flex justify-center">

              {
                user?._id && (
                  <div className='cursor-pointer flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                    {
                      user.profileImage ? (
                        <img src={user.profileImage} className='w-10 h-10 rounded-full' alt={user.name}></img>
                      ) : (
                        <FaRegUserCircle fontSize={28} />
                      )
                    }
                  </div>
                )
              }

              {
                user?.role === Role.ADMIN && menuDisplay && (
                  <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded hidden md:block">
                    <nav>
                      <Link to="/adminpanel/allproducts" className="whitespace-nowrap hover:bg-slate-100 p-2" onClick={() => setMenuDisplay(preve => !preve)} >Admin panel</Link>
                    </nav>
                  </div>
                )
              }

            </div>
            {
              user._id && (
                <Link to="/cart" className='cursor-pointer relative'>
                  <span><FaShoppingCart fontSize={25} /></span>
                  <div className='bg-red-500 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                    <p className='text-sm'>{context.cartProductCount}</p>
                  </div>
                </Link>
              )}

            <div className="">
              {
                user._id ?
                  (
                    <button onClick={handleLogout} className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">Logout</button>
                  )
                  :
                  (
                    <Link to="/login">
                      <button className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">Login</button>
                    </Link>
                  )
              }
            </div>

          </div>


        </div>
      </header>
    </div>
  )
}

export default Header