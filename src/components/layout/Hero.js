"use client"

import Image from "next/image.js";
import Right from "../icons/Right.js";
import Left from "../icons/Left.js";
import Loading from "../../app/feed/loading.js";
import useProfile from "../Menu/UseProfile.js";
import Link from "next/link.js";

export default function Hero() {






    return (
        <>
            <section className="hero md:mt-4">
                <div className="py-8 md:py-12">

                    <h1 className="text-4xl font-semibold"
                    >اقدم وأكبر مطاعم المشويات
                        <br />ببني سويف
                        <br />وأعلاها مبيعاً
                        <br />
                        <span className="text-primary"> منذ عام ١٩٦٢</span>
                    </h1>
                    <p className="my-6 text-gray-500">احلي اكله مشويات ممكن تاكلها في حياتك</p>
                    <div className="flex gap-4 text-sm">
                        <button className="bg-primary uppercase items-center justify-center flex gap-2 text-white px-4 py-2 rounded-full">

                            <Link href={"/menu"} className=" flex items-center justify-center gap-2 text-xl">

                                اطلب ألان!
                                <Left />
                            </Link>

                        </ button>
                        <button className="flex items-center justify-center text-gray-600 font-semibold text-xl">

                            أبحث أكثر!
                            <Left />
                        </button>
                    </div>
                </div>

                <div className="relative hidden md:block">
                    <Image src={'/1.jpg'} layout={"fill"} objectFit={"contain"} alt={'pizza'} />
                </div>
            </section>

        </>
    )

}