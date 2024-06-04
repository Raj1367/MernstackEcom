import React, { useEffect, useState } from 'react'
import image1 from "../assets/banner/img1.webp"
import image1Mobile from "../assets/banner/img1_mobile.jpg"
import image2 from "../assets/banner/img2.webp"
import image2Mobile from "../assets/banner/img2_mobile.webp"
import image3 from "../assets/banner/img3.jpg"
import image3Mobile from "../assets/banner/img3_mobile.jpg"
import image4 from "../assets/banner/img4.jpg"
import image4Mobile from "../assets/banner/img4_mobile.jpg"
import image5 from "../assets/banner/img5.webp"
import image5Mobile from "../assets/banner/img5_mobile.png"
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
const BannerProduct = () => {

    const [currImage, setCurrImage] = useState(0)

    const desktopImages = [
        image1, image2, image3, image4, image5,
    ]

    const MobileImages = [
        image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile,
    ]

    const nextImage = () => {
        if (desktopImages.length - 1 > currImage) {
            setCurrImage((prev) => prev + 1)
        }
    }

    const PrevImage = () => {
        if (currImage !== 0) {
            setCurrImage((prev) => prev - 1)
        }
    }

    useEffect(()=>{
        const interval=setInterval(()=>{
            if (desktopImages.length - 1 > currImage){
                nextImage()
            }

            else{
                setCurrImage(0)
            }

        },3000)

        return ()=>clearInterval(interval)

    },[currImage])

    return (
        <div className="container mx-auto px-4 rounded">
            <div className="h-56 md:h-72 w-full bg-slate-200 relative">

                <div className="absolute z-10 h-full w-full md:flex items-center hidden">
                    <div className="flex justify-between w-full text-2xl">
                        <button onClick={PrevImage} className="bg-white shadow-md rounded-full p-1"><FaAngleLeft /></button>
                        <button onClick={nextImage} className="bg-white shadow-md rounded-full p-1" ><FaAngleRight /></button>
                    </div>
                </div>

                {/* desktop version */}
                <div className="hidden md:flex h-full w-full overflow-hidden">
                    {
                        desktopImages.map((item, index) => (
                            <div className="w-full h-full min-w-full min-h-full transition-all" key={item} style={{ transform: `translateX(${-currImage * 100}%)` }}>
                                <img src={item} className="w-full h-full rounded"></img>
                            </div>
                        ))
                    }
                </div>

                {/* Mobile version */}
                <div className="flex h-full w-full overflow-hidden md:hidden">
                    {
                        MobileImages.map((item, index) => (
                            <div className="w-full h-full min-w-full min-h-full transition-all" key={item} style={{ transform: `translateX(${-currImage * 100}%)` }}>
                                <img src={item} className="rounded object-cover w-full h-full"></img>
                            </div>
                        ))
                    }
                </div>


            </div>
        </div>
    )
}

export default BannerProduct