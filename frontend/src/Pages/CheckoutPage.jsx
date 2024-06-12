import React, { useState, useEffect } from 'react'
import displayINRCurrency from '../Helpers/DisplayCurrency'
import SummaryApi from '../Common'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutPage = () => {

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        addressLine1: "",
        addressLine2: "",
        landmark: "",
        state: "",
        city: "",
        postalCode: "",
    })

    const [productData, setProductData] = useState([])

    const totalQuantity = productData.reduce((prev, curr) => { return prev + curr.quantity }, 0)
    const subTotalPrice = productData.reduce((prev, curr) => { return prev + (curr.quantity * curr.productId.sellingPrice) }, 0)
    const shippingPrice = productData.reduce((prev, curr) => { return prev + (curr.quantity * curr.productId.sellingPrice) }, 350)
    const totalPrice = productData.reduce((prev, curr) => { return prev + (curr.quantity * curr.productId.sellingPrice) }, 350)

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value,
                totalQuantity: totalQuantity,
                orderTotal: totalPrice,
                userCheckoutData: productData,
            }
        })
    }


    const handleSubmit = async (e) => {

        const stripePromise = await loadStripe("pk_test_51POXvzP1CcJ6oeB2UhigWpJN3y0kpadSdIaHPZFDBVXCgbNSAG7RXL6LLth1k8iVRyByXBfgU2jYqo3kMYam12Cc00rHmH8jRc")

        e.preventDefault()
        const dataResponse = await fetch(SummaryApi.userCheckout.url, {
            method: SummaryApi.userCheckout.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const response = await dataResponse.json()
        console.log(response)

        if (response.success) {
            toast.success(response.message)
            fetchData()
        }

        if (response.error) {
            toast.error(response.message)
        }

        const resp = await fetch(SummaryApi.userPayment.url, {
            method: SummaryApi.userPayment.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },

            body: JSON.stringify({ cartData: productData })
        })

        const responseData = await resp.json()

        if (responseData?.id) {
            stripePromise.redirectToCheckout({ sessionId: responseData.id })
        }

        console.log("userpaymentData", responseData)



    }


    const fetchData = async () => {

        const response = await fetch(SummaryApi.cartProductView.url, {
            method: SummaryApi.cartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        })

        const responseData = await response.json()

        if (responseData.success) {
            setProductData(responseData.data)
        }

    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div>
            <div className="bg-red-600 text-white py-4 flex  justify-center items-center">
                <h1 className="font-semibold md:text-2xl text-lg uppercase">Checkout</h1>
            </div>

            <div className="mx-auto container lg:mt-16 mt-8">

                <div className="flex lg:flex-row lg:justify-between lg:items-center flex-col-reverse lg:mt-6">

                    <div className=" flex justify-center items-center">
                        <div className="bg-white rounded shadow-lg  w-[350px] lg:w-[800px] md:w-[650px]">
                            <h2 className="text-white bg-red-600 px-4 py-2 text-center font-semibold text-lg rounded-t capitalize">Enter Shipping details</h2>

                            <form action="" onSubmit={handleSubmit}>

                                <div className="flex md:flex-row flex-col md:justify-between items-center md:px-6 px-2 my-5 md:gap-0 gap-3">
                                    <div className="flex flex-col md:justify-center items-start gap-1">
                                        <h3 className="font-medium">First Name:</h3>
                                        <input type="text" name="firstName" value={data.firstName} required="firstName" onChange={handleOnChange} className=" bg-slate-200 border-2 border-slate-200 rounded w-[300px]  lg:w-[350px] md:w-[280px]" />
                                    </div>

                                    <div className="flex flex-col justify-center items-start gap-1">
                                        <h3 className="font-medium">Last Name:</h3>
                                        <input type="text" name="lastName" value={data.lastName} required="lastName" onChange={handleOnChange} className=" bg-slate-200 border-2 border-slate-200 rounded  w-[300px] lg:w-[350px] md:w-[280px]" />
                                    </div>
                                </div>

                                <div className="flex md:flex-row flex-col md:justify-between items-center md:px-6 px-2 my-5 md:gap-0 gap-3">
                                    <div className="flex flex-col md:justify-center items-start gap-1">
                                        <h3 className="font-medium">Email:</h3>
                                        <input type="email" name="email" value={data.email} required="email" onChange={handleOnChange} className=" bg-slate-200 border-2 border-slate-200 rounded w-[300px]  lg:w-[350px] md:w-[280px]" />
                                    </div>

                                    <div className="flex flex-col justify-center items-start gap-1">
                                        <h3 className="font-medium">Conatct No:</h3>
                                        <input type="number" name="contact" value={data.contact} required="contact" onChange={handleOnChange} className=" bg-slate-200 border-2 border-slate-200 rounded w-[300px] lg:w-[350px] md:w-[280px]" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 items-start px-6 my-5">
                                    <div className="flex flex-col justify-center items-start gap-1">
                                        <h3 className="font-medium">Address Line 1:</h3>
                                        <input type="text" name="addressLine1" value={data.addressLine1} required="addressLine1" onChange={handleOnChange} className=" bg-slate-200 border-2 border-slate-200 rounded lg:w-[750px] md:w-[600px] w-[300px]" />
                                    </div>


                                    <div className="flex flex-col justify-center items-start gap-1">
                                        <h3 className="font-medium">Address Line 2:</h3>
                                        <input type="text" name="addressLine2" value={data.addressLine2} required="addressLine2" onChange={handleOnChange} className=" bg-slate-200 border-2 border-slate-200 rounded lg:w-[750px] md:w-[600px] w-[300px]" />
                                    </div>

                                    <div className="flex flex-col justify-center items-start gap-1">
                                        <h3 className="font-medium">Landmark:</h3>
                                        <input type="text" name="landmark" value={data.landmark} required="landmark" onChange={handleOnChange} className=" bg-slate-200 border-2 border-slate-200 rounded lg:w-[750px] md:w-[600px] w-[300px]" />
                                    </div>
                                </div>

                                <div className="flex md:flex-row flex-col  justify-between gap-2 items-start px-6 my-5">
                                    <div className="flex flex-col justify-center items-start ">
                                        <h3 className="font-medium">State:</h3>
                                        <input type="text" name="state" value={data.state} required="state" onChange={handleOnChange} className=" bg-slate-200 border-2 border-slate-200 rounded  w-[300px] md:w-auto" />
                                    </div>


                                    <div className="flex flex-col justify-center items-start gap-1">
                                        <h3 className="font-medium">City:</h3>
                                        <input type="text" name="city" value={data.city} required="city" onChange={handleOnChange} className=" bg-slate-200 border-2 border-slate-200 rounded  w-[300px] md:w-auto" />
                                    </div>

                                    <div className="flex flex-col justify-center items-start gap-1">
                                        <h3 className="font-medium">Postal Code:</h3>
                                        <input type="number" name="postalCode" value={data.postalCode} required="postalCode" onChange={handleOnChange} className=" bg-slate-200 border-2 border-slate-200 rounded w-[300px] md:w-auto" />
                                    </div>
                                </div>

                                {/* <div className="flex justify-start items-center my-8 gap-3 px-6">
                                <h3 className="font-medium">Billing Address same as Shipping Address</h3>
                                <input type="checkbox" name="" id="" />
                            </div> */}

                                <div className="flex justify-center lg:gap-10 gap-6 items-center my-10">
                                    <Link to="/cart"><button className="border-2  border-red-600 bg-white text-red-600 hover:border-red-600 hover:text-white hover:bg-red-600 py-1 px-6 rounded font-medium md:text-lg text-sm">Return to Cart</button></Link>
                                    <button className="border bg-red-600 text-white hover:border-red-600 hover:text-white hover:bg-red-700 py-1 px-8 rounded font-medium md:text-lg text-sm">Pay Now</button>
                                </div>

                            </form>
                        </div>
                    </div>


                    <div className="flex flex-col justify-center items-center gap-6">
                        <div className="flex flex-col gap-3">
                            <div className="bg-white  w-[350px] md:w-[500px] h-[250px] rounded shadow border border-slate-300">
                                <h2 className="text-white bg-red-600 px-4 py-2 text-center font-semibold text-lg rounded-t capitalize">Items to checkout</h2>
                                <div className="overflow-y-scroll h-[203px]">
                                    {
                                        productData.map((product, index) => {
                                            return (
                                                <div className="flex justify-center items-center">
                                                    <div key={product?._id + "Add to Cart loading"} className="w-[320px] md:w-[450px] bg-white  my-4 border border-slate-300 rounded grid grid-cols-[128px,1fr] shadow-md">
                                                        <div className="w-28 h-full bg-slate-200 flex justify-center items-center border-e-2 border-slate-300">
                                                            <img src={product?.productId.productImage[0]} alt={product.productName} className="w-20 h-20 object-scale-down mix-blend-multiply" />
                                                        </div>

                                                        <div className='md:p-4 p-2'>
                                                            <h2 className="md:text-lg text-md text-ellipsis line-clamp-1 font-semibold w-[60%] cursor-pointer">{product?.productId.productName}</h2>
                                                            <p className="capitalize text-slate-500 text-sm">{product?.productId.category}</p>

                                                            <div className="flex justify-between items-center relative">
                                                                <div className="flex md:flex-row flex-col items-center md:gap-3 md:mt-1 mt-2">
                                                                    <p className="md:text-lg text-sm text-red-600 font-semibold">{displayINRCurrency(product?.productId.sellingPrice)}</p>
                                                                    <p className="md:text-md text-xs text-slate-500 line-through">{displayINRCurrency(product?.productId.price)}</p>
                                                                </div>

                                                                <div className="flex justify-center items-center md:gap-6 gap-2 lg:px-2 absolute bottom-7 right-0">
                                                                    <div className="flex justify-center items-center bg-red-500 w-8 h-8 rounded-full mx-2 md:mx-0">
                                                                        <label className="font-semibold md:text-lg   text-white">{product?.quantity}</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center items-center mb-6 md:w-[500px] w-[350px]">
                            <div className="lg:mt-4 w-full md:max-w-lg">
                                <div className=" bg-white rounded border border-slate-300 shadow-lg">
                                    <h2 className="text-white bg-red-600 px-4 py-2 text-center font-semibold text-lg rounded-t">Order Summary</h2>
                                    <div className="mt-3 flex flex-col gap-3">
                                        <div className="px-6 flex text-lg justify-between items-center">
                                            <p className="font-medium md:text-md text-base">Total Quantity:</p>
                                            <p className="px-2" name="totalQuantity">{totalQuantity}</p>
                                        </div>
                                        <div className="px-6 flex text-lg justify-between">
                                            <p className="font-medium md:text-md text-base">SubTotal:</p>
                                            <p>{displayINRCurrency(subTotalPrice)}</p>
                                        </div>

                                        <div className="px-6 flex text-lg justify-between items-center">
                                            <p className="font-medium md:text-md text-base">Standard Shipping (₹350): </p>
                                            <p>{displayINRCurrency(shippingPrice)}</p>
                                        </div>

                                        {/* <div className="px-6 flex text-lg justify-between items-center">
                                            <p className="font-medium md:text-md text-base">Taxes GST/SGST:</p>
                                            <p>{displayINRCurrency(Taxes)}</p>
                                        </div> */}

                                        <div className="px-6 flex text-xl justify-between items-center bg-yellow-500 py-2">
                                            <p className="font-bold">Total:</p>
                                            <p>{displayINRCurrency(totalPrice)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                
            </div>




        </div >
    )
}

export default CheckoutPage