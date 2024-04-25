"use client"

import toast from "react-hot-toast";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { redirect, useParams } from "next/navigation";
import useProfile from './../../../../components/Menu/UseProfile';
import DeleteButton from './../../../../components/DeleteButton';
import MenuItemForm from './../../../../components/layout/MenuItemForm';
import UserTabs from "../../../../components/layout/UserTabs.js";
import Left from "../../../../components/icons/Left.js";
import Loading from "../../../feed/loading.js";


export default function EditMenuItem() {
    const { id } = useParams()
    const { loading, data } = useProfile()
    const [menuItems, setMenuItems] = useState(null)

    const [redirectTo, setRedirectTo] = useState(false)

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id)
                setMenuItems(item)
            })
        })
    }, [])





    async function handleFormSubmit(e, data) {
        e.preventDefault()
        data = { ...data, _id: id }
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch("/api/menu-items", {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (response.ok)
                resolve()
            
            else
                reject()
        })
        await toast.promise(savingPromise, {
            loading: "Saving...",
            success: "Saved!",
            error: "ERROR"
        })
        setRedirectTo(true)
    }
    async function handleDeleteClick() {

        const deletePromise = new Promise(async (resolve, reject) => {
            const response = await fetch("/api/menu-items?_id=" + id, {
                method: 'DELETE',

            })
            if (response.ok)
                resolve()
            else
                reject()
        })
        await toast.promise(deletePromise, {
            loading: "Deleting...",
            success: "Deleted!",
            error: "ERROR"
        })
        setRedirectTo(true)

    }

    if (redirectTo) {
        return redirect("/menu-items")
    }

    if (loading) {
        return <Loading />
    }

    if (!data.admin) {

        return "You Are Not An Admin"
    }


    return (
        <>
            <section className="mt-8 max-w-xl mx-auto">
                <UserTabs isAdmin={data.admin} />

                <div className="mt-8 max-w-md mx-auto ">
                    <Link className='button text-xl' href={'/menu-items'}>
                        إظهار كل عناصر القائمة
                        <Left />
                    </Link>
                </div>

                <MenuItemForm menuItem={menuItems} onSubmit={handleFormSubmit} />

                <div className="max-w-md mx-auto   mt-4  ">


                    <div className="max-w-xs mr-auto pr-11 text-lg ">
                        <DeleteButton
                            onDelete={handleDeleteClick}
                            label={"مسح العنصر"}
                        />
                    </div>



                </div>
            </section>
        </>
    )

}