import React from 'react'
import success from "../assets/success.gif"
import { Link } from 'react-router-dom'
const PaymentSuccess = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-8">

            <div className="flex flex-col justify-center items-center">
                <img src={success} alt="" className="mix-blend-multiply w-72 h-72"/>
                <h1 className="text-3xl uppercase font-bold">PAYMENT SUCCESS</h1>
            </div>

            <div className="flex gap-8">
                <Link to="/userprofile/myorders"><button className="border-2 border-red-600 text-red-600 hover:border-red-600 hover:text-white hover:bg-red-600 py-2 px-8 rounded font-medium md:text-lg text-sm">Check order</button></Link>
                <Link to="/"><button className="bg-red-600 text-white hover:bg-red-700 hover:text-white py-2 px-8 rounded font-medium md:text-lg text-sm">Home Page</button></Link>
            </div>
            <p>Redirecting to Homepage in <span className="font-semibold">5</span> seconds...</p>
        </div>
    )
}

export default PaymentSuccess