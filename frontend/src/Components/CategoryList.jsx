import React, { useState, useContext } from 'react'
import { useEffect } from 'react'
import { Link } from "react-router-dom"
import SummaryApi from '../Common'
import Context from '../Context'

const CategoryList = () => {

    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const categoryLoading = new Array(13).fill(null)


    const fetchCategoryProduct = async () => {
        const resp = await fetch(SummaryApi.singleProductCategorywise.url)
        const dataRep = await resp.json()
        setLoading(false)
        setCategoryProduct(dataRep.data)
    }

    useEffect(() => {
        fetchCategoryProduct()
    }, [])


    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
                {

                    loading ? (
                        categoryLoading.map((el, index) => {
                            return (
                                <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse shadow-lg' key={"categoryLoading" + index}>
                                </div>
                            )
                        })
                    ) :
                        (
                            categoryProduct.map((item, index) => {
                                return (
                                    <Link to={"/productcategory?category=" + item?.category} className='cursor-pointer' key={item?.category}>
                                        <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-white flex items-center justify-center shadow-lg'>
                                            <img src={item?.productImage[0]} alt={item?.category} className='h-full  mix-blend-multiply hover:scale-125 transition-all' />
                                        </div>
                                        <p className='text-center text-sm md:text-base capitalize font-semibold'>{item?.category}</p>
                                    </Link>
                                )
                            })
                        )
                }
            </div>
        </div>
    )
}

export default CategoryList