"use client"


import SectionHeaders from './../../../components/layout/SectionHeaders';

import AddressInputs from './../../../components/layout/AddressInputs';

import { CartContext, cartProductPrice } from '../../../components/AppContext.js';
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCart from '../../../components/Menu/ProductCart.js';
import Loading from '../../feed/loading.js';
import useProfile from '../../../components/Menu/UseProfile.js';


export default function PageOrder() {

    const { clearCart } = useContext(CartContext);
    const [order, setOrder] = useState();

    const { data, loading } = useProfile()

    const { id } = useParams();
    useEffect(() => {
        if (typeof window.console !== "undefined") {
            if (window.location.href.includes('clear-cart=1')) {
                clearCart();
            }
        }

        if (id) {

            fetch('/api/orders?_id=' + id).then(res => {
                res.json().then(orderData => {
                    setOrder(orderData);
                    console.log(orderData)
                });
            })
        }

    }, [])

    let subtotal = 0;
    if (order?.cartProducts) {
        for (const product of order?.cartProducts) {
            subtotal += cartProductPrice(product);
        }
    }

    if (loading) {
        return <Loading />
    }
    return (

        <>

            <section className=" mt-8  max-w-2xl mx-auto">
                <div className="text-center  ">
                    <SectionHeaders secondHeader={"Your Order"} />

                    <div className="mt-4 mb-8">
                        <p>Thanks for your order.</p>
                        <p>We will call you when your order will be on the way.</p>
                    </div>

                </div>


                {order && (

                    <div className="grid md:grid-cols-2 md:gap-16">
                        <div>

                            {order?.cartProducts?.map(product => (
                                <ProductCart key={product._id} product={product} />
                            ))}
                            <div className="text-right py-2 text-gray-500">
                                Subtotal:
                                <span className="text-black font-bold inline-block w-8">${subtotal}</span>
                                <br />
                                Delivery:
                                <span className="text-black font-bold inline-block w-8">$5</span>
                                <br />
                                Total:
                                <span className="text-black font-bold inline-block w-8">
                                    ${subtotal + 5}
                                </span>
                            </div>
                        </div>
                        <div >
                            <div className="bg-gray-100 p-4 rounded-lg">
                                {order.deliveryOption == "delivery" ?
                                    <AddressInputs disabled={true} addressProps={order} />
                                    :
                                    <>
                                        <label>Table Number</label>
                                        <input
                                            disabled={true}
                                            type="text"
                                            value={order.tableNumber}
                                        />
                                    </>
                                }


                            </div>
                        </div>
                    </div>

                )}

            </section>

        </>
    )
}