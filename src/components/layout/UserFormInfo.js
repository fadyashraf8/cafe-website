"use client"
import { useState, useEffect } from "react"
import EditableImage from "./EditableImage.js"
import useProfile from "../Menu/UseProfile.js"
import AdressInputs from './AddressInputs.js';


export default function UserFormInfo({ user, onSave }) {
    const [userName, setUserName] = useState(user?.name || "")
    const [image, setImage] = useState(user?.image || "")
    const [phone, setPhone] = useState(user?.phone || "")
    const [stAddress, setStAddress] = useState(user?.stAddress || "")
    const [anotherPhone, setAnotherPhone] = useState(user?.anotherPhone || "")
    const [city, setCity] = useState(user?.city || "")
    const [country, setCountry] = useState(user?.country || "")
    const [admin, setAdmin] = useState(user?.admin || false)

    const { data: userLoggedIn } = useProfile()



    function handleAddressChange(propName, value) {
        if (propName === 'phone') setPhone(value);
        if (propName === 'stAddress') setStAddress(value);
        if (propName === 'anotherPhone') setAnotherPhone(value);
        if (propName === 'city') setCity(value);
        if (propName === 'country') setCountry(value);
      }

    return (
        <div className="md:flex gap-4 leading-0 ">

            <div>
                <div className="p-2 rounded-lg max-w-[120px]">
                    <EditableImage link={image} setLink={setImage} />
                </div>

            </div>

            <form className="grow" onSubmit={e => onSave(e, {
                name: userName, image, phone,
                admin, stAddress, anotherPhone, city, country
            })}>
                <label className="text-xl">الاسم</label>
                <input type="text" placeholder="First Name And Last Name" value={userName} onChange={e => setUserName(e.target.value)} />
                <label className="text-xl">البريد الالكتروني</label>

                <input type="email" disabled={true} value={user?.email} />

               <AdressInputs 
               addressProps={{phone, stAddress,anotherPhone, city, country}}
               setAddressProp={handleAddressChange}
               />



                {userLoggedIn?.admin ? <div >
                    <label htmlFor="adminCb" className="p-2 inline-flex items-center gap-2 mb-2">
                        <input id="adminCb" type="checkbox"
                            checked={admin} value={"1"} onChange={e => setAdmin(e.target.checked)}
                        />
                        <span> Admin</span>
                    </label>
                </div> : ""}


                <button className="text-xl" type='submit'>حفظ</button>

            </form>


        </div>
    )
}