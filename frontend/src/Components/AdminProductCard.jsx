import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../Helpers/DisplayCurrency';

const AdminProductCard = ({ data, fetchData }) => {

    const [editProduct, setEditProduct] = useState(false)

    return (
        <div className='bg-white p-4 rounded shadow-lg'>
            <div className='xl:w-80 xl:h-80 md:w-60 md:h-60'>
                <div className='xl:w-60 xl:h-60 md:w-40 md:h-40 flex justify-center items-center mx-auto'>
                    <img src={data?.productImage[0]} className='mx-auto object-fill h-full' />
                </div>
                <h1 className='text-ellipsis line-clamp-1 text-lg'>{data.productName}</h1>

                <div>

                    <p className='font-semibold'>
                        {
                            displayINRCurrency(data.sellingPrice)
                        }

                    </p>

                    <div className='w-fit ml-auto p-2 bg-green-200 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
                        <MdModeEditOutline />
                    </div>

                </div>
            </div>

            {
                editProduct && (
                    <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchData={fetchData} />
                )
            }

        </div>
    )
}

export default AdminProductCard