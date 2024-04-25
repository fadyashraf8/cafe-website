"use client"

import { CartContext, cartProductPrice } from '../../components/AppContext.js';

import AddressInputs from '../../components/layout/AddressInputs.js';
import SectionHeaders from '../../components/layout/SectionHeaders.js';

import useProfile from '../../components/Menu/UseProfile.js';
import { useContext, useEffect, useState } from 'react';
import toast from "react-hot-toast";


import Loading from '../feed/loading.js';
import ProductCart from '../../components/Menu/ProductCart.js';
import Indoor from '../../components/layout/Indoor.js';






export default function Cart() {


    const { cartProducts, removeCartProducts } = useContext(CartContext)
    const [address, setAddress] = useState({});
  
    const [payment, setPayment] = useState("cash");
    const [deliveryOption, setDeliveryOption] = useState("delivery");
    const [tableNumber, setTableNumber] = useState("");

    const { loading, data } = useProfile()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('canceled=1')) {
                toast.error('Payment failed!');
            }
        }

    }, []);

    useEffect(() => {
        if (data?.city) {
            const { phone, stAddress, city, country, anotherPhone } = data
            const addressProfile = { phone, stAddress, city, country, anotherPhone }
            setAddress(addressProfile)
        }
    }, [data])

    let subTotal = 0
    for (const p of cartProducts) {
        subTotal += cartProductPrice(p)
    }
    function handleAddressChange(propName, value) {
        setAddress(prevAddress => ({ ...prevAddress, [propName]: value }));
    }

    async function proceedToCheckout(e) {
        e.preventDefault();

        if(payment=="online"){
            const promise = new Promise((resolve, reject) => {
                fetch('/api/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        address,
                        cartProducts,
                        tableNumber,
                        deliveryOption
                    }),
                }).then(async (response) => {
    
                    if (response.ok) {
                        resolve();
                            const onlineData= await response.json();
                            window.location=onlineData.stripeSessionUrl
                           
             
                    } else {
                        reject();
                    }
                });
            });
            await toast.promise(promise, {
                loading: 'Preparing your order...',
                success: 'Redirecting to payment...',
                error: 'Something went wrong... Please try again later',
            })
    
        }
        else{
            const promise = new Promise((resolve, reject) => {
                fetch('/api/cashpay', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        address,
                        cartProducts,
                        tableNumber,
                        deliveryOption
                    }),
                }).then(async (response) => {
                    if (response.ok) {
                        resolve();
                        const DataLink = await response.json();
                        window.location = DataLink.redirectUrl
                        console.log(DataLink)
                    } else {
                        reject();
                    }
                })
            });
            await toast.promise(promise, {
                loading: 'Preparing your order...',
                success: 'Redirecting to payment...',
                error: 'Something went wrong... Please try again later',
            })
        }

    }


  


    if (loading) {
        return <Loading />
    }


    if (cartProducts?.length === 0) {
        return (
            <section className="  h-screen flex items-center flex-col justify-center">

                <SectionHeaders secondHeader={"Cart"} />
                <h1 className="text-2xl">Your Cart Is Empty</h1>

            </section>
        )
    }




    return (


        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders secondHeader={"Cart"} />
            </div>
            <div className="grid grid-cols-2 mt-8 gap-8">
                <div>
                    {cartProducts?.length === 0 && (
                        <div> No Shopping In Your Cart</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index) =>


                        <ProductCart key={index} product={product}
                            onRemove={() => (removeCartProducts(index))} />
                    )}
                    <div className="text-right py-4 pr-30 ">
                        <span> Subtotal :</span>
                        <span className="font-semibold text-lg pl-1">${subTotal}</span>
                        <br />
                        <span> Delievery :</span>
                        <span className="font-semibold text-lg pl-1">$5</span>
                        <br />

                        <span> Total :</span>
                        <span className="font-semibold text-lg pl-1">${subTotal + 5}</span>
                    </div>

                </div>
                <div className="bg-gray-300 p-2">
                    <div className="flex gap-2">
                        <button
                            onClick={() => 
                                setPayment("online")
                                   
                            }
                             className={payment=="online" ? "text-white bg-primary" : "bg-gray-300 text-black"}
                            >
                            Online Payment</button>

                        <button
                            onClick={() => 
                                setPayment("cash")
                            }
                            className={payment=="cash" ? "text-white bg-primary" : "bg-gray-300 text-black"}
                            >
                            Cash Payment</button>
                    </div>

                    <div className="flex flex-col items-center justify-center ">
                        <h3 className="text-2xl  text-black mt-4">Where Are You ?</h3>
                        <select
                            className="w-52 "
                            value={deliveryOption}
                            onChange={(e) => setDeliveryOption(e.target.value)}
                        >

                            <option>Please Select One</option>
                            <option value="delivery">Delivery</option>
                            <option value="indoor">Indoor</option>
                        </select>
                    </div>

              
             

                    <form className="bg-gray-300  p-4 rounded-lg" onSubmit={proceedToCheckout}>
                                    {deliveryOption==="delivery"?
                                            <AddressInputs
                                            addressProps={address}
                                            setAddressProp={handleAddressChange}
                                        />
                                    :
                                    <Indoor tableNumber={tableNumber} setTableNumber={setTableNumber} />
                                    }
                            

                                    {payment==="cash"?
                                      <button className='bg-primary text-white'>
                                        Pay Cash {subTotal + 5}EGP</button>
                                      :
                                      <button className='bg-primary text-white'>
                                        Pay Online {subTotal + 5}EGP</button>
                                    }
             
                                </form>
                          
                          
                       
                           
                  

                </div>
            </div>
        </section>

    )
}