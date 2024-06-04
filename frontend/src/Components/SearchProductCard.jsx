import React, { useContext } from 'react'
import scrollTop from '../Helpers/ScrollTop'
import displayINRCurrency from '../Helpers/DisplayCurrency'
import Context from '../Context'
import addToCart from '../Helpers/AddToCart'
import { Link } from 'react-router-dom'

const SearchProductCard = ({ loading, data = [] }) => {

    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddtoCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }


    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,300px))] md:gap-16 gap-12 overflow-x-scroll scrollbar-none transition-all '>
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
                                        <p className='text-red-600 font-medium bg-slate-100 p-1 w-full py-4 rounded-full animate-pulse'></p>
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

                            <Link to={"/product/" + product?._id} className='w-full min-w-[310px] md:min-w-[340px] max-w-[340px] md:max-w-[340px] shadow-lg  bg-white' onClick={scrollTop}>
                                <div className='bg-slate-200 h-48 p-3 min-w-[280px] md:min-w-[145px] flex items-center justify-center'>
                                    <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                                </div>
                                <div className='p-4 grid gap-2'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black text-center'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500 text-center'>{product?.category}</p>
                                    <div className='flex gap-3 justify-center items-center'>
                                        <p className='text-red-600 font-medium text-center text-lg'>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-500 line-through text-center'>{displayINRCurrency(product?.price)}</p>
                                    </div>
                                    <button className='text-md bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-full mt-2' onClick={(e) => handleAddtoCart(e, product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        )
                    })
                )
            }
        </div>
    )
}

export default SearchProductCard