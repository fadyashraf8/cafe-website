"use client"
import { useEffect, useState } from 'react'
import UserTabs from '../../components/layout/UserTabs.js'
import SectionHeaders from '../../components/layout/SectionHeaders.js'
import useProfile from '../../components/Menu/UseProfile.js'
import Loading from './../feed/loading';
import { dbTimeForHuman } from './../../libs/datetime';
import Link from "next/link";



export default function Orders() {
    const [orders, setOrders] = useState([]);


    const { data, loading } = useProfile()




    useEffect(() => {
        fetchOrders();
    }, []);


    function fetchOrders() {
        fetch('/api/orders').then(res => {
            res.json().then(orders => {
                setOrders(orders.reverse());
                console.log(orders)

            })
        })
    }

    if (loading) {
        return <Loading />
    }

    if (orders?.length === 0) {

        return (<div className=" text-center my-10">

            <SectionHeaders secondHeader={"There Are No Orders Yet"} />
            <Link href={'/menu'}><button className="btn my-5 bg-black text-white w-50">Order Now</button></Link>
        </div>)
    }

    return (
        <>
            <section className="mt-8 max-w-2xl mx-auto">
                <UserTabs isAdmin={data.admin} />


                <div className="mt-8">

                    {orders?.length > 0 && orders.map((order, index) => (
                        <div
                            key={order._id}
                            className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6">

                            <div className="grow flex flex-col md:flex-row items-center gap-6">
                                <div className="flex gap-2">
                                    <span className="text-white text-center p-2 mr-4  rounded-lg   bg-black w-10"> {index + 1}</span>
                                    <div className={
                                        (order.paid ? 'bg-green-500 text-lg' : 'text-lg bg-red-400')
                                        + ' p-2 rounded-md text-white w-24 text-center'
                                    }>
                                        {order.paid ? 'مدفوع' : 'غير مدفوع'}
                                    </div>
                                </div>
                                <div className="grow">
                                    <div className="flex gap-2 items-center mb-1">
                                        <div className="grow"> {order.userEmail}  </div>
                                        <div className="text-gray-500 text-sm">{dbTimeForHuman(order.createdAt)}</div>
                                    </div>
                                    <div className="text-gray-500   text-sm">  {order.cartProducts.map(p => p.name).join(', ')}</div>
                                </div>
                            </div>
                            <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                                <Link href={"/orders/" + order._id} className="button text-lg">
                                    تفاصيل الطلب
                                </Link>
                            </div>

                        </div>

                    ))}
                </div>
            </section>

        </>
    )
}


