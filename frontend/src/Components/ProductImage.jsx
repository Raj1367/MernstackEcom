import React from 'react'
import { CgClose } from "react-icons/cg";

const ProductImage = ({ imgUrl, onClose }) => {
    return (
        <div className="fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center">
            <div className="bg-slate-100 rounded shadow-xl mx-w-2xl mx-auto">
                <div className='w-fit ml-auto text-xl hover:text-red-600 cursor-pointer p-2' onClick={onClose}>
                    <CgClose />
                </div>
                <div className="flex justify-center p-5 max-h-[40vh] max-w-[40vh]">
                    <img src={imgUrl} className="w-full h-full" alt="image" />
                </div>
            </div>

        </div>
    )
}

export default ProductImage