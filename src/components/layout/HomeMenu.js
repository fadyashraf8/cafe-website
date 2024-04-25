"use client"
import Image from "next/image.js";
import MenuItem from "../Menu/MenuItem.js";
import SectionHeaders from "./SectionHeaders.js";
import { useState, useEffect } from "react";

export default function HomeMenu() {

    const [bestSellers, setBestSellers] = useState([])


    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setBestSellers(menuItems.slice(-3))
            
            })
        })

    }, [])

    return (
        <>
            <section className="my-3 ">



                {/* <div className="absolute left-0 right-0 w-full justify-start">
                    <div className=" absolute left-0 -top-24 -z-10">
                        <Image src={'/sallad1.png'} alt={"sallad"} width={109} height={189} />
                    </div >
                    <div className=" absolute right-0 -top-36  -z-10">
                        <Image src={'/sallad2.png'} alt={"sallad"} width={107} height={195} />
                    </div >
                </div> */}


                <div className="text-center">
                    <SectionHeaders
                        firstHeader={"أكتشف أكثر!"}
                        secondHeader={"أفضل منتجاتنا"}
                    />
                </div>


                <div className="container mx-auto p-6 grid sm:grid-cols-3 gap-4 my-3 ">

                    {bestSellers?.map((e) => {
                       return <MenuItem key={e._id} {...e} />
                    })}
                </div>

            </section>



        </>
    )
}
