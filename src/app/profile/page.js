'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation.js";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import UserTabs from './../../components/layout/UserTabs';
import UserFormInfo from './../../components/layout/UserFormInfo';
import Loading from '../feed/loading.js';
import useProfile from "../../components/Menu/UseProfile.js";


export default function Profile() {


    const session = useSession()
    const { data, loading } = useProfile()

    const [user, setUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [profileFetched, setProfileFetched] = useState(false)
    const { status } = session


    useEffect(() => {
        if (status === "authenticated") {
    
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                   setUser(data)
                    setIsAdmin(data.admin)
                    setProfileFetched(true)
                })
            })
        }
    }, [status, session])


    async function handleProfileInfoUpdate(e,data) {
        e.preventDefault()
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch("/api/profile", {
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
            success: "Profile Saved!",
            error: "ERROR"
        })
    }


   






    if (status === "loading" || !profileFetched) {
        return <Loading />
    }

    if (status === "unauthenticated") {
        return redirect("/login")
    }










    return (
        <section className="my-5">

            <UserTabs isAdmin={data.admin} />

            <div className="my-3 mx-auto max-w-lg">
               
<UserFormInfo user={user} onSave={handleProfileInfoUpdate}/>

            </div>
        </section>
    )
}
