import React, { useEffect, useState } from 'react'
import SummaryApi from '../Common'
import moment from 'moment'
import displayINRCurrency from '../Helpers/DisplayCurrency'
const MyOrders = () => {

    const [data, setData] = useState([])

    const fetchOrderDetails = async () => {

        const response = await fetch(SummaryApi.orderList.url, {
            method: SummaryApi.orderList.method,
            credentials: "include",
        })

        const responseData = await response.json()
        console.log("orderlist", responseData)
        setData(responseData.data)
    }

    useEffect(() => {
        fetchOrderDetails()
    }, [])

    return (
        <div className='p-4 bg-white'>
            <p className="font-semibold text-xl uppercase">My Orders</p>

            {
                !data[0] && (
                    <p>No order available</p>
                )
            }

            <div>
                {
                    data.map((item, index) => {
                        return (
                            <div key={item.userId + index} className="mt-3">
                                <div className="bg-slate-100 flex flex-col gap-3 p-2 shadow-lg rounded">

                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-3">
                                            <p className="font-medium text-md uppercase">Order created:</p>
                                            <p className="text-md text-red-600 capitalize font-medium">{moment(item.createdAt).format("LLL")}</p>
                                        </div>

                                        <div className="flex gap-3">
                                            <p className="font-medium text-md uppercase">Order ID:</p>
                                            <p className="text-md text-red-600 capitalize font-medium">{item._id}</p>
                                        </div>

                                        <div className="flex gap-3 px-4">
                                            <p className="font-medium text-md uppercase">Order Status:</p>
                                            <p className="text-md text-red-600 capitalize font-medium">Processed</p>
                                        </div>
                                    </div>

                                    <hr />

                                    <div className="flex  flex-col gap-1">
                                        <p className="font-medium text-md uppercase">Order Items:</p>
                                        <div className="overflow-y-scroll h-44">
                                            {item?.productDetails.map((product, index) => {
                                                return (
                                                    <div className="flex gap-4 items-center py-3 px-4">
                                                        <img src={product.image[0]} className="w-20 h-20 border-2 rounded shadow-md"></img>
                                                        <div>
                                                            <p className="font-medium">{product.name}</p>
                                                            <div className="flex gap-6">
                                                                <p className="font-medium">Price: <span className="font-normal">{displayINRCurrency(product.price)}</span></p>
                                                                <p className="font-medium">Qty: <span className="font-normal">{product.quantity}</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <hr />

                                    <div className="flex flex-col gap-1">

                                        <p className="font-medium text-md uppercase">Order Deatils:</p>

                                        <div className="flex justify-between items-center">
                                            <div className="flex  gap-16">
                                                <p className="font-medium">Payment Method: <span className="font-normal uppercase ">{item.paymentDetails.payment_method_type}</span></p>
                                                <p className="font-medium">Payment Status: <span className="font-normal uppercase ">{item.paymentDetails.payment_status}</span></p>
                                                <p className="font-medium">Standard Shipping: <span className="font-normal uppercase ">350.00 INR</span></p>
                                                <p className="font-medium ">Order Total: <span className="font-meidum uppercase text-red-600">{displayINRCurrency(item.totalAmount)}</span></p>
                                            </div>

                                            <div className="flex gap-4">
                                                <button className="border bg-red-600 text-white hover:border-red-600 hover:text-white hover:bg-red-700 py-1 px-4 rounded font-medium md:text-lg text-sm">Help</button>
                                                <button className="border bg-red-600 text-white hover:border-red-600 hover:text-white hover:bg-red-700 py-1 px-4 rounded font-medium md:text-lg text-sm">Cancel order</button>
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
    )
}

export default MyOrders