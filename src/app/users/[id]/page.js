"use client"
import {useState,useEffect} from "react"
import {  useParams } from "next/navigation";

import UserTabs from './../../../components/layout/UserTabs';
import useProfile from '../../../components/Menu/UseProfile.js';

import UserFormInfo from "../../../components/layout/UserFormInfo.js";
import toast from "react-hot-toast";
import Loading from "../../feed/loading.js";




export default function EditUserInfo(){


const {loading,data}=useProfile()
const {id}=useParams()
const [user,setUsers]=useState(null)


useEffect(() => {
    fetch('/api/profile?_id='+id).then(res => {
        res.json().then(user=> {
            setUsers(user)
        })
    })
}, [])

async function handleSaveClick(e,data){
e.preventDefault()

const savingPromise = new Promise(async (resolve, reject) => {
    const response = await fetch("/api/profile", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...data,_id:id})
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
if (loading) {
    return <Loading />
}

if (!data.admin) {

    return "You Are Not An Admin"
}
    return (

        <>
        <section className="mt-8">
<UserTabs isAdmin={true}/>
<UserFormInfo user={user} onSave={handleSaveClick}/>
        </section>
        
        
        </>
    )
}