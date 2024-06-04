import React, { useContext, useEffect, useRef, useState } from 'react'
import FetchCategoryWiseProduct from './FetchCategoryWiseProduct'
import displayINRCurrency from '../Helpers/DisplayCurrency'
import { Link } from "react-router-dom"
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import AddToCart from '../Helpers/AddToCart';
import Context from '../Context';
import addToCart from '../Helpers/AddToCart';

const HorizontalProductCard = ({ category, heading }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

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


            <div className='flex items-center gap-5 md:gap-7 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>

                <button className="bg-white shadow-md rounded-full p-1 absolute left-0 hidden md:block" onClick={scrollLeft}><FaAngleLeft /></button>
                <button className="bg-white shadow-md rounded-full p-1 absolute right-0 hidden md:block" onClick={scrollRight}><FaAngleRight /></button>
                {
                    loading ? (
                        loadingList.map((product, index) => {
                            return (
                                <div className='w-full min-w-[310px] md:min-w-[340px] max-w-[340px] md:max-w-[340px] h-36 bg-white shadow-xl flex'>
                                    <div className='bg-slate-300 h-full p-3 min-w-[120px] md:min-w-[145px] animate-pulse'>

                                    </div>
                                    <div className='p-4 grid w-full gap-2'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 p-1 rounded-full animate-pulse'></h2>
                                        <p className='capitalize text-slate-500 p-1 bg-slate-200 rounded-full animate-pulse'></p>
                                        <div className='flex gap-3 w-full'>
                                            <p className='text-red-600 md:font-medium p-1 bg-slate-200 w-full rounded-full animate-pulse'></p>
                                            <p className='text-slate-500 line-through text-sm p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                        </div>
                                        <div className="mt-2 flex justify-center">
                                            <button className='text-sm bg-slate-200 text-white px-3 py-0.5 rounded-full w-[70px] animate-pulse'></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        data.map((product, index) => {
                            return (
                                <Link to={"product/" + product?._id} className='w-full min-w-[310px] md:min-w-[340px] max-w-[340px] md:max-w-[340px] h-36 bg-white shadow-xl flex'>
                                    <div className='bg-slate-200 h-full p-3 min-w-[120px] md:min-w-[145px]'>
                                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                                    </div>
                                    <div className='p-4 grid'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.category}</p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 md:font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-500 line-through  text-sm'>{displayINRCurrency(product?.price)}</p>
                                        </div>
                                        <div className="mt-2 flex justify-center">
                                            <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full' onClick={(e) => handleAddtoCart(e, product?._id)}>Add to cart</button>
                                            {/* {
                                             AddToCart.productId===product._id?(
                                                <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full' onClick={(e) => AddToCart(e, product?._id)}>Add to cart</button>
                                             ):(
                                                <button className='text-sm border border-red-600  text-red-600 px-3 py-1 rounded-full hover:bg-red-600 hover:text-white transition-all' onClick={(e) => AddToCart(e, product?._id)}>Remove from cart</button>
                                             )
                                           } */}
                                        </div>
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

export default HorizontalProductCard