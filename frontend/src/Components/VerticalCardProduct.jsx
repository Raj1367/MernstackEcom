import React, { useEffect, useRef, useState,useContext } from 'react'
import FetchCategoryWiseProduct from './FetchCategoryWiseProduct'
import displayINRCurrency from '../Helpers/DisplayCurrency'
import { Link } from "react-router-dom"
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import Context from '../Context';
import addToCart from '../Helpers/AddToCart';

const VerticalCardProduct = ({ category, heading }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddtoCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await FetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("horizontal data", categoryProduct)
        setData(categoryProduct?.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }



    return (
        <div className='container mx-auto px-4 my-6 relative'>

            <h2 className='md:text-2xl text-xl font-semibold py-4 uppercase'>{heading}</h2>


            <div className='flex items-center gap-5 md:gap-7 overflow-x-scroll scrollbar-none transition-all ' ref={scrollElement}>

                <button className="bg-white shadow-md rounded-full p-1 absolute left-0 hidden md:block" onClick={scrollLeft}><FaAngleLeft /></button>
                <button className="bg-white shadow-md rounded-full p-1 absolute right-0 hidden md:block" onClick={scrollRight}><FaAngleRight /></button>
                {
                    loading ? (
                        loadingList.map((product, index) => {
                            return (
                                <div className='w-full min-w-[310px] md:min-w-[340px] max-w-[340px] md:max-w-[340px]  bg-white shadow-xl'>
                                    <div className='bg-slate-300 h-48 p-3 min-w-[280px] md:min-w-[145px] flex items-center justify-center animate-pulse shadow-sm'>
                                        
                                    </div>
                                    <div className='p-4 grid gap-2'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-bg-black bg-slate-100 w-full h-[30px] rounded-full animate-pulse'></h2>
                                        <p className='capitalize text-slate-500 bg-slate-100 p-1 w-full py-4 rounded-full animate-pulse'></p>
                                        <div className='flex gap-3 w-full'>
                                            <p className='text-red-600 md:font-medium bg-slate-100 p-1 w-full py-4 rounded-full animate-pulse'></p>
                                            <p className='text-slate-500 line-through bg-slate-100 p-1 w-full py-4 rounded-full animate-pulse'></p>
                                        </div>
                                        <button className='text-md bg-slate-100 text-white px-3 mt-2 py-4 rounded-full animate-pulse'></button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        data.map((product, index) => {
                            return (
                                <Link to={"product/" + product?._id} className='w-full min-w-[310px] md:min-w-[340px] max-w-[340px] md:max-w-[340px]  bg-white shadow-xl'>
                                    <div className='bg-slate-200 h-48 p-3 min-w-[280px] md:min-w-[145px] flex items-center justify-center'>
                                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                                    </div>
                                    <div className='p-4 grid gap-2'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.category}</p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 md:font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                        </div>
                                        <button className='text-md bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-full mt-2' onClick={(e)=>handleAddtoCart(e,product?._id)}>Add to Cart</button>
                                    </div>
                                </Link>
                            )
                        })
                    )
                }
            </div>


        </div>
    )
}

export default VerticalCardProduct