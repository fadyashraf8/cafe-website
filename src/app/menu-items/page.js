"use client"
import UserTabs from './../../components/layout/UserTabs';
import Link from "next/link";

import useProfile from '../../components/Menu/UseProfile.js';
import Loading from './../feed/loading';

import Right from '../../components/icons/Right.js';
import { useEffect, useState } from 'react';
import Image from 'next/image.js';



export default function MenuItems() {

    const { loading, data } = useProfile()
    const [menuItems, setMenuItems] = useState([])
    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems)
            })
        })
    }, [])






    if (loading) {
        return <Loading />
    }

    if (!data.admin) {

        return "You Are Not An Admin"
    }



    return (


        <>
            <section className='mx-auto mt-8 max-w-xl '>
                <UserTabs isAdmin={data.admin} />


                <div className='mt-8 '>

                    <Link className='button text-xl' href={'/menu-items/new'}>
                        <Right />
                        اضافة عنصر جديد
                    </Link>
                </div>

                <div>
                    <h2 className='text-xl text-gray-500 mt-5 mb-0'>تعديل عنصر </h2>
                    <div className='grid grid-cols-3  gap-2'>
                        {menuItems?.map((e) => {
                            return <Link key={e._id} href={`/menu-items/edit/` + e._id} className='button mb-1 flex-col'>
                                    <div className='relative '>
                                        <Image src={e.image} alt={''} width={100} height={100} />
                                    </div>
                                    {e.name}

                                </Link>

                       
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}