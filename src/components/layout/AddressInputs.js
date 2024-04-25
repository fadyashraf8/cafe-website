"use client"
import { useState } from "react"

export default function AdressInputs({ addressProps, setAddressProp, disabled = false }) {

    const { phone,  stAddress, anotherPhone, city, country } = addressProps





    return (



        <>


       

       




         

                 
          

         

                    <label className="text-xl">رقم الهاتف</label>
                    <input required disabled={disabled} value={phone || ""} onChange={e => setAddressProp("phone", e.target.value)}
                        type="tel" placeholder="Phone Number" />
                    <label className="text-xl">اسم الشارع </label>
                    <input required disabled={disabled} value={stAddress || ""} onChange={e => setAddressProp("stAddress", e.target.value)}
                        type="text" placeholder="Street Address" />

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-xl">رقم هاتف اخر</label>

                            <input required disabled={disabled}
                                value={anotherPhone || ""} onChange={e => setAddressProp("anotherPhone", e.target.value)}
                                type="text" placeholder="Another Phone" />
                        </div>

                        <div>
                            <label className="text-xl">المدينة</label>
                            <input required disabled={disabled}
                                value={city || ""} onChange={e => setAddressProp("city", e.target.value)}
                                type="text" placeholder="City" />
                        </div>

                    </div>

                    <label className="text-xl">البلد</label>
                    <input required disabled={disabled} value={country || ""} onChange={e => setAddressProp("country", e.target.value)}
                        type="text" placeholder="Country" />
           




        </>
    )
}