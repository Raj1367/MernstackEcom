import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../Common'
import SearchProductCard from '../Components/SearchProductCard'
import MobileSearchBar from '../Components/MobileSearchBar'


const SearchProduct = () => {

    const query = useLocation()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    console.log(query.search)

    const fetchProduct = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url + query.search)
        const responseData = await response.json()
        setLoading(false)
        setData(responseData.data)
        console.log(responseData)
    }

    useEffect(() => {
        fetchProduct()
    }, [query])

    return (
        <div className="container mx-auto p-4">
            {
                loading &&
                (<p className='text-center text-lg'>Loading...</p>)
            }
            <p className='text-center text-lg font-semibold'>Search Results: {data.length}</p>

            {
                data.length === 0 && !loading && (
                    <p className="bg-white text-lg text-center p-4 mt-3 shadow-lg rounded">No products found...</p>
                )
            }

            <MobileSearchBar></MobileSearchBar>

            {
                data.length !== 0 && !loading && (
                    <div className="mt-6 md:block flex justify-center items-center">
                        <SearchProductCard loading={loading} data={data}></SearchProductCard>
                    </div>
                )
            }

        </div>
    )
}

export default SearchProduct