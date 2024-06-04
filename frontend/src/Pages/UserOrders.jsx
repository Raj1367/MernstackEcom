import React, { useEffect, useState } from 'react'
import SummaryApi from '../Common';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeOrderStatus from '../Components/ChangeOrderStatus';
import displayINRCurrency from '../Helpers/DisplayCurrency'

const UserOrders = () => {

    const [userData, setUserData] = useState([]);
    const [userCheckoutData, setUserCheckoutData] = useState([])

    const [updateOrderStatus, setUpdateOrderStatus] = useState(false)

    const [updateOrderDetails, setUpdateOrderDetails] = useState({
        orderId: "",
        userId: "",
        name: "",
        email: "",
        contact: "",
        status: "",
    })

    const fetchUserCheckoutData = async () => {
        const fetchData = await fetch(SummaryApi.userOrders.url, {
            method: SummaryApi.userOrders.method,
            credentials: 'include'
        })
        const dataResponse = await fetchData.json()
        console.log("usercheckoutData", dataResponse.data[0].userCheckoutData)
        setUserData(dataResponse.data)
        setUserCheckoutData(dataResponse.data[0].userCheckoutData)
    }

    useEffect(() => {
        fetchUserCheckoutData()
    }, [])



    return (
        <div className='p-4 bg-white h-[calc(120vh-120px)]  overflow-y-scroll'>
            <table className="w-full userTable">
                <thead>
                    <tr className='bg-black text-white'>
                        <th>SR.No.</th>
                        <th>User Details</th>
                        <th>OrderDetails</th>
                        <th>Created Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userData.map((item, index) => (
                            <tr key={index}>
                                <td> {index + 1}</td>

                                <td>
                                    <div className="flex items-center gap-2 px-2">
                                        <label className='font-medium'>UserID:</label>
                                        <p>{item.userId}</p>
                                    </div>
                                    <hr />
                                    <div className="flex items-center gap-2 px-2">
                                        <label className='font-medium'>Name:</label>
                                        <p>{item.firstName} {item.lastName}</p>
                                    </div>
                                    <hr />
                                    <div className="flex items-center gap-2 px-2">
                                        <label className='font-medium'>Email:</label>
                                        <p>{item.email}</p>
                                    </div>
                                    <hr />
                                    <div className="flex items-center gap-2 px-2">
                                        <label className='font-medium'>Conatct No:</label>
                                        <p>+91 {item.contact}</p>
                                    </div>
                                    <hr />
                                    <div className="flex items-center gap-2 px-2">
                                        <label className='font-medium'>AddressLine1:</label>
                                        <p>{item.addressLine1}</p>
                                    </div>

                                    <div className="flex items-center gap-2 px-2">
                                        <label className='font-medium'>AddressLine2:</label>
                                        <p>{item.addressLine2}</p>
                                    </div>

                                    <div className="flex gap-2 px-2">
                                        <div className="flex items-center gap-2 ">
                                            <label className='font-medium'>Landmark:</label>
                                            <p>{item.landmark}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label className='font-medium'>State:</label>
                                            <p>{item.state}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 px-2">

                                        <div className="flex items-center gap-2">
                                            <label className='font-medium'>City:</label>
                                            <p>{item.city}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label className='font-medium'>PostalCode:</label>
                                            <p>{item.postalCode}</p>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div className="flex gap-2 px-2">
                                        <label className='font-medium'>OrderID:</label>
                                        <p>{item._id}</p>
                                    </div>
                                    <hr />
                                    <div className="flex gap-2 px-2">
                                        <label className='font-medium'>TotalQuantity:</label>
                                        <p>{item.totalQuantity}</p>
                                    </div>
                                    <hr />
                                    <div className="flex  gap-2 px-2">
                                        <label className='font-medium'>OrderTotal:</label>
                                        <p>{displayINRCurrency(item.orderTotal)}</p>
                                    </div>
                                    <hr />
                                    <div className="flex flex-col overflow-y-scroll h-32">
                                        <label className='font-medium text-start px-2 text-red-600'>OrderData:</label>
                                        {
                                            userCheckoutData.map((item, index) => {
                                                return (

                                                    <div className="flex items-center">
                                                        <div className="my-1 mx-2 bg-slate-200 shadow-md flex justify-between items-center px-4 py-2 gap-6">
                                                            <hr />
                                                            <div className="flex flex-col">
                                                                <div className="flex gap-1">
                                                                    <label className='font-medium text-sm'>ProductID:</label>
                                                                    <p className="text-sm">{item.productId._id}</p>
                                                                </div>
                                                                <div className="flex gap-1">
                                                                    <label className='font-medium text-sm'>ProductName:</label>
                                                                    <p className="text-sm">{item.productId.productName}</p>
                                                                </div>
                                                                <div className="flex gap-1">
                                                                    <label className='font-medium text-sm'>Sale price:</label>
                                                                    <p className="text-sm">{displayINRCurrency(item.productId.sellingPrice)}</p>
                                                                    <label className='font-medium text-sm'>Price:</label>
                                                                    <p className="text-sm">{displayINRCurrency(item.productId.price)}</p>
                                                                </div>

                                                                <div className="flex gap-1">
                                                                    <label className='font-medium text-sm'>Order quantity:</label>
                                                                    <p className="text-sm">{item.quantity}</p>
                                                                </div>
                                                            </div>

                                                            <div className="w-16 h-16 bg-slate-200 flex justify-center items-center">
                                                                <img src={item?.productId.productImage[0]} className="object-scale-down mix-blend-multiply" />
                                                            </div>

                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                </td>

                                <td> {moment(item.createdAt).format("LLL")}</td>
                                
                                <td>Pending</td>

                                <td>
                                    <button
                                        className="bg-blue-400 p-1 rounded-full cursor-pointer hover:bg-blue-500 text-white"
                                        onClick={() => {
                                            setUpdateOrderDetails(item),
                                                setUpdateOrderStatus(true)
                                        }}>
                                        <MdModeEdit />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {
                updateOrderStatus && (
                    <ChangeOrderStatus
                        onClose={() => setUpdateOrderStatus(false)}
                        orderId={updateOrderDetails.orderId}
                        userId={updateOrderDetails.userId}
                        name={updateOrderDetails.name}
                        email={updateOrderDetails.email}
                        contact={updateOrderDetails.contact}
                        status={updateOrderDetails.status}
                    >
                    </ChangeOrderStatus>
                )
            }

        </div>
    )
}

export default UserOrders