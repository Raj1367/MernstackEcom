import React, { useEffect, useState, useContext, useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../Helpers/DisplayCurrency"
import SummaryApi from '../Common'
import Recomendedproducts from '../Components/Recomendedproducts';
import Context from '../Context';
import addToCart from '../Helpers/AddToCart';

const ProductDetails = () => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    })
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const productImageListLoading = new Array(4).fill(null)
    const [activeImage, setActiveImage] = useState("")

    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
        x: 0,
        y: 0
    })
    const [zoomImage, setZoomImage] = useState(false)


    const navigate = useNavigate()

    const fetchProductDetails = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.productDetails.url, {
            method: SummaryApi.productDetails.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                productId: params?.id
            })
        })
        setLoading(false)
        const dataReponse = await response.json()

        setData(dataReponse?.data)
        setActiveImage(dataReponse?.data?.productImage[0])

    }

    console.log("data", data)

    useEffect(() => {
        fetchProductDetails()
    }, [params])

    const handleMouseEnterProduct = (imageURL) => {
        setActiveImage(imageURL)
    }

    const handleZoomImage = useCallback((e) => {
        setZoomImage(true)
        const { left, top, width, height } = e.target.getBoundingClientRect()
        console.log("coordinate", left, top, width, height)

        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height

        setZoomImageCoordinate({
            x,
            y
        })
    }, [zoomImageCoordinate])

    const handleLeaveImageZoom = () => {
        setZoomImage(false)
    }

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddtoCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    const handleBuyProduct = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }


    return (
        <div className='container mx-auto p-4'>

            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4 justify-center items-center'>
                {/***product Image */}
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

                    <div className="flex justify-center items-center">
                        <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 md:h-[400px] md:w-[400px] bg-slate-200 relative p-2 shadow-md rounded-lg'>

                            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />


                            {/**product zoom */}
                            {
                                zoomImage && (
                                    <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0 shadow-lg rounded-lg'>
                                        <div
                                            className='w-full h-full min-h-[400px] min-w-[400px] mix-blend-multiply scale-150'
                                            style={{
                                                background: `url(${activeImage})`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `

                                            }}
                                        >

                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>

                    <div className='h-full'>
                        {
                            loading ? (
                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full shadow-md'>
                                    {
                                        productImageListLoading.map((el, index) => {
                                            return (
                                                <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage" + index}>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            ) : (
                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full '>
                                    {
                                        data?.productImage?.map((imgURL, index) => {
                                            return (
                                                <div className='lg:h-20 lg:w-20 md:h-24 md:w-24 w-16 h-16 bg-slate-100 rounded p-1 shadow-lg' key={imgURL}>
                                                    <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imgURL)} onClick={() => handleMouseEnterProduct(imgURL)} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>

                {/***product details */}
                <div className="lg:mt-0 md:mt-32 mt-8">
                    {
                        loading ? (
                            <div className='grid gap-1 w-full'>
                                <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
                                <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
                                <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>

                                <div className='text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>

                                </div>

                                <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
                                    <p className='text-red-600 bg-slate-200 w-full'></p>
                                    <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
                                </div>

                                <div className='flex items-center gap-3 my-2 w-full'>
                                    <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                                    <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                                </div>

                                <div className='w-full'>
                                    <p className='text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full'></p>
                                    <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full'></p>
                                </div>
                            </div>
                        ) :
                            (
                                <div className='flex flex-col gap-1'>
                                    <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
                                    <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                                    <p className='capitalize text-slate-400'>{data?.category}</p>

                                    <div className='text-red-600 flex items-center gap-1'>
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStarHalf />
                                    </div>

                                    <div className='flex items-center gap-2  my-1'>
                                        <p className='text-red-600 text-2xl'>{displayINRCurrency(data.sellingPrice)}</p>
                                        <p className='text-slate-400 line-through'>{displayINRCurrency(data.price)}</p>
                                    </div>

                                    <div className='flex items-center gap-3 my-2'>
                                        <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e) => handleBuyProduct(e, data?._id)}>Buy Now</button>
                                        <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white' onClick={(e) => handleAddtoCart(e, data?._id)}>Add To Cart</button>
                                    </div>

                                    <div>
                                        <p className='text-slate-800 font-medium my-1 text-lg'>Description : </p>
                                        <p>{data?.description}</p>
                                    </div>
                                </div>
                            )
                    }

                </div>
            </div>

            {
                data.category && (
                    <div className="md:block flex justify-center items-center w-full">
                        <Recomendedproducts category={data.category} heading={"products recomended for you..."}></Recomendedproducts>
                    </div>
                )
            }


        </div >
    )
}

export default ProductDetails

