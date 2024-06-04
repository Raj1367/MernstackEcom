import React, { useEffect, useState } from 'react'
import UploadProducts from '../Components/UploadProducts'
import SummaryApi from '../Common'
import AdminProductCard from '../Components/AdminProductCard'

const AllProducts = () => {

  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    console.log("product data", dataResponse)

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(() => {
    fetchAllProduct()
  },[])

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All products</h2>
        <button className="border-2 border-red-600 text-red-600 py-1 px-3 rounded-full hover:bg-red-600 hover:text-white transition-all capitalize active:scale-95 font-medium" onClick={() => setOpenUploadProduct(true)}>Upload products</button>
      </div>

      {/* all products */}
      <div className='flex items-center justify-center flex-wrap gap-5 py-4 h-[calc(100vh-120px)]  overflow-y-scroll'>
        {
          allProduct.map((item, index) => {
            return (
              <AdminProductCard data={item} key={index+"all products"} fetchData={fetchAllProduct}></AdminProductCard>
            )
          })
        }
      </div>
      {/* uplaod products */}
      {
        openUploadProduct && (
          <UploadProducts onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct}></UploadProducts>
        )
      }

    </div>
  )
}

export default AllProducts