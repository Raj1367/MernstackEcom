import React,{useState} from 'react'
import {  useLocation, useNavigate } from "react-router-dom"
import { GrSearch } from "react-icons/gr";
const MobileSearchBar = () => {
    
    const navigate = useNavigate()
    const searchInput=useLocation()
    const [search,setSearch]=useState(searchInput?.search?.split("=")[1])

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
        <div className="md:hidden flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2 mt-5 mb-2 bg-white mx-auto shadow-lg">
            <input className='w-fit outline-none px-2' type="text" placeholder='search products here...' onChange={handleSearch} value={search} />
            <div className='text-lg min-w-[50px] bg-red-600 h-8 flex items-center justify-center rounded-r-full text-white'>
                <GrSearch />
            </div>
        </div>
    )
}

export default MobileSearchBar