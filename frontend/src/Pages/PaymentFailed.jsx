import React from 'react'
import failed from "../assets/failed.gif"
import { Link } from 'react-router-dom'
const PaymentFailed = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-8 mt-6">

            <div className="flex flex-col justify-center items-center">
                <img src={failed} alt="" className="mix-blend-multiply w-80 h-80" />
                <h1 className="text-3xl uppercase font-bold">PAYMENT FAILED</h1>
            </div>

            <div className="flex gap-8">
                <Link to="/"><button className="bg-red-600 text-white hover:bg-red-700 hover:text-white py-2 px-8 rounded font-medium md:text-lg text-sm">Home Page</button></Link>
            </div>
            <p>Redirecting to Homepage in <span className="font-semibold">5</span> seconds...</p>
        </div>
    )
}

export default PaymentFailed