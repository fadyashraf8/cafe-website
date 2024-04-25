"use client"
import { useState } from 'react';
import useProfile from '../../../components/Menu/UseProfile.js';
import toast from "react-hot-toast";
import Link from "next/link";
import UserTabs from './../../../components/layout/UserTabs';
import EditableImage from './../../../components/layout/EditableImage';
import Left from './../../../components/icons/Left';
import { redirect } from 'next/navigation.js';
import MenuItemForm from '../../../components/layout/MenuItemForm.js';
import Loading from '../../feed/loading.js';

export default function NewMenuItemPage() {

    const [redirectTo, setRedirectTo] = useState(false)
    const { loading, data } = useProfile()

    async function handleFormSubmit(e, data) {
        e.preventDefault()
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch("/api/menu-items", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            })
            if (response.ok)
                resolve()
            else
                reject()
        })
        await toast.promise(savingPromise, {
            loading: 'Saving this tasty item',
            success: 'Saved',
            error: 'Error',
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
                    <Link className='button' href={'/menu-items'}>
                        <Left />
                        Show All Menu Items
                    </Link>
                </div>
                <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
            </section>
        </>
    )
}