import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../Common'
import Context from '../Context'
import displayINRCurrency from '../Helpers/DisplayCurrency'
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { TbFileTypeXls } from 'react-icons/tb';

const Cart = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async () => {

        setLoading(true)
        const response = await fetch(SummaryApi.cartProductView.url, {
            method: SummaryApi.cartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        })
        setLoading(false)


        const responseData = await response.json()

        if (responseData.success) {
            setData(responseData.data)
        }

    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log("cart data", data)


    const increaseCartQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartQuantity.url, {
            method: SummaryApi.updateCartQuantity.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                    quantity: qty + 1
                }
            )
        })

        const responseData = await response.json()


        if (responseData.success) {
            toast.success(responseData.message)
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const decreaseCartQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartQuantity.url, {
            method: SummaryApi.updateCartQuantity.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                    quantity: qty - 1
                }
            )
        })

        const responseData = await response.json()


        if (responseData.success) {
            toast.success(responseData.message)
            fetchData()
        }
    }

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                }
            )
        })

        const responseData = await response.json()


        if (responseData.success) {
            toast.success(responseData.message)
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const totalQuantity = data.reduce((prev, curr) => { return prev + curr.quantity }, 0)
    const totalPrice = data.reduce((prev, curr) => { return prev + (curr.quantity * curr.productId.sellingPrice) }, 0)



    return (
        <div>
            <div className="bg-red-600 text-white py-4 flex  justify-center items-center">
                <h1 className="font-semibold md:text-2xl text-lg uppercase">Cart</h1>
            </div>

            <div className="container mx-auto">

                <div className="text-center text-lg my-3 ">
                    {
                        data.length === 0 && !loading && (
                            <p className="bg-white py-5 text-2xl uppercase font-semibold">your cart is Empty</p>
                        )
                    }
                </div>

                <div className="flex flex-col lg:flex-row gap-10 lg:justify-between px-3 mt-5">

                    {/* view products */}
                    <div className="w-full max-w-3xl">
                        {
                            loading ?
                                (
                                    loadingCart.map(
                                        (product, index) => {
                                            return (
                                                <div
                                                    key={index + "Add to Cart loading"}
                                                    className="w-full bg-slate-200 h-32 my-3 border border-slate-300 animate-pulse rounded">
                                                </div>)
                                        })
                                )
                                : (
                                    data[0] && (
                                        data.map((product, index) => {
                                            return (
                                                <div
                                                    key={product?._id + "Add to Cart loading"}
                                                    className="w-full bg-white  my-4 border border-slate-300 rounded grid grid-cols-[128px,1fr] shadow-md">

                                                    <div className="w-28 h-full bg-slate-200 flex justify-center items-center border-e-2 border-slate-300">
                                                        <img src={product?.productId.productImage[0]} alt={product.productName} className="w-24 h-24 object-scale-down mix-blend-multiply" />
                                                    </div>

                                                    <div className='md:p-4 p-2'>
                                                        <Link to={"/product/" + product?.productId._id}> <h2 className="md:text-lg text-md text-ellipsis line-clamp-1 font-semibold w-[60%] cursor-pointer">{product?.productId.productName}</h2></Link>
                                                        <p className="capitalize text-slate-500 text-sm">{product?.productId.category}</p>

                                                        <div className="flex justify-between items-center relative">
                                                            <div className="flex md:flex-row flex-col items-center md:gap-3 md:mt-1 mt-2">
                                                                <p className="md:text-lg text-sm text-red-600 font-semibold">{displayINRCurrency(product?.productId.sellingPrice)}</p>
                                                                <p className="md:text-md text-xs text-slate-500 line-through">{displayINRCurrency(product?.productId.price)}</p>
                                                            </div>

                                                            <div className="flex justify-center items-center md:gap-6 gap-2 lg:px-2 absolute bottom-7 right-0">
                                                                <div className="flex items-center md:gap-3 gap-2">
                                                                    <button className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white md:w-6 md:h-6 w-5 h-5 flex justify-center items-center rounded transition-all text-sm cursor-pointer" onClick={product?.quantity === 1 ? (() => deleteCartProduct(product?._id)) : (() => decreaseCartQty(product?._id, product?.quantity))}>-</button>
                                                                    <span className="font-semibold rounded">{product?.quantity}</span>
                                                                    <button className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white md:w-6 md:h-6 w-5 h-5 flex justify-center items-center rounded transition-all text-sm cursor-pointer" onClick={() => increaseCartQty(product?._id, product?.quantity)}>+</button>
                                                                </div>
                                                                <div className="flex items-center cursor-pointer">
                                                                    <MdDeleteForever className="md:text-3xl text-2xl text-slate-700" onClick={() => deleteCartProduct(product?._id)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    )
                                )
                        }
                    </div>

                    {/* Summary  desktop size*/}
                    <div className="lg:mt-4 w-full md:max-w-lg lg:block hidden">
                        {
                            loading ? (
                                <div className="h-36 bg-slate-200 rounded border border-slate-300">
                                    Total
                                </div>
                            ) : (
                                <div className=" bg-white rounded border border-slate-300 shadow-lg">
                                    <h2 className="text-white bg-red-600 px-4 py-2 text-center font-semibold text-lg rounded-t">Cart Summary</h2>
                                    <div className="mt-3 flex flex-col gap-3">
                                        <div className="px-6 flex text-lg justify-between items-center">
                                            <p className="font-medium">Quantity:</p>
                                            <p className="px-2">{totalQuantity}</p>
                                        </div>
                                        <div className="px-6 flex text-lg justify-between items-center">
                                            <p className="font-medium">Apply Coupon/Voucher:</p>
                                            <input type="text" placeholder='Enter code here..' className="border border-slate-300 bg-slate-100 rounded px-2" />
                                        </div>
                                        <div className="px-6 flex text-lg justify-between">
                                            <p className="font-medium">SubTotal:</p>
                                            <p>{displayINRCurrency(totalPrice)}</p>
                                        </div>
                                        <div className="px-6 flex text-lg justify-between items-center">
                                            <p className="font-medium">Total:</p>
                                            <p>{displayINRCurrency(totalPrice)}</p>
                                        </div>
                                    </div>

                                    <div className="text-center m-5">
                                        <p className="text-slate-500">Shipping and taxes will be calculated during checkout</p>
                                    </div>


                                    {
                                        totalQuantity === 0 ? (
                                            <div className="flex justify-center items-center gap-8 m-6">
                                                <Link to="/"> <button className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-2 px-2 rounded font-medium">Return to Homepage</button></Link>
                                                <button disabled className="border bg-slate-400 text-white py-2 px-6 rounded font-medium cursor-not-allowed">Checkout</button>
                                            </div>
                                        ) : (
                                            <div className="flex justify-center items-center gap-8 m-6">
                                                <Link to="/"> <button className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-2 px-2 rounded font-medium">Return to Homepage</button></Link>
                                                <Link to="/checkout"><button className="border bg-red-600 text-white hover:border-red-600 hover:text-white hover:bg-red-700 py-2 px-6 rounded font-medium">Checkout</button></Link>
                                            </div>
                                        )
                                    }

                                </div>
                            )
                        }
                    </div>

                    {/* Summary other sizes */}
                    <div className="lg:hidden md:flex justify-center items-center">
                        <div className="w-full md:max-w-lg mb-12">
                            {
                                loading ? (
                                    <div className="h-full bg-slate-200 rounded border border-slate-300">
                                        Total
                                    </div>
                                ) : (
                                    <div className=" bg-white rounded border border-slate-300 shadow-lg">
                                        <h2 className="text-white bg-red-600 px-4 py-2 text-center font-semibold text-lg rounded-t">Cart Summary</h2>
                                        <div className="mt-3 flex flex-col gap-3">
                                            <div className="px-6 flex text-lg justify-between items-center">
                                                <p className="font-medium md:text-lg text-sm">Quantity:</p>
                                                <p className="font-semibold md:text-lg md:text-md text-sm px-2">{totalQuantity}</p>
                                            </div>
                                            <div className="px-6 flex text-lg justify-between items-center">
                                                <p className="font-medium md:text-lg text-sm">Apply Coupon:</p>
                                                <input type="text" placeholder='Enter code here' className="border border-slate-300 bg-slate-100 rounded px-2 md:text-lg text-sm" />
                                            </div>
                                            <div className="px-6 flex text-lg justify-between">
                                                <p className="font-medium md:text-lg text-sm">SubTotal:</p>
                                                <p className="font-medium md:text-lg text-sm">{displayINRCurrency(totalPrice)}</p>
                                            </div>
                                            <div className="px-6 flex text-lg justify-between items-center">
                                                <p className="font-medium md:text-lg text-sm">Total:</p>
                                                <p className="font-medium md:text-lg text-sm">{displayINRCurrency(totalPrice)}</p>
                                            </div>
                                        </div>

                                        <div className="text-center m-8">
                                            <p className="md:text-md text-sm  text-slate-500">Shipping and taxes will be calculated during checkout</p>
                                        </div>

                                        {
                                            totalQuantity === 0 ? (
                                                <div className="flex justify-center items-center gap-8 m-6">
                                                    <Link to="/"> <button className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-2 px-2 rounded font-medium">Return to Homepage</button></Link>
                                                    <button disabled className="border bg-slate-400 text-white py-2 px-6 rounded font-medium cursor-not-allowed">Checkout</button>
                                                </div>
                                            ) : (
                                                <div className="flex justify-center items-center gap-8 m-6">
                                                    <Link to="/"> <button className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-2 px-2 rounded font-medium text-sm">Return to Homepage</button></Link>
                                                    <Link to="/checkout"><button className="border bg-red-600 text-white hover:border-red-600 hover:text-white hover:bg-red-700 py-2 px-6 rounded font-medium text-sm">Checkout</button></Link>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Cart