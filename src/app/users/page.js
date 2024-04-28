"use client"
import { useEffect, useState } from 'react';
import UserTabs from './../../components/layout/UserTabs';
import useProfile from '../../components/Menu/UseProfile.js';
import Link from 'next/link.js';
import Loading from './../feed/loading';


export default function Users() {


    const { loading, data } = useProfile()
    const [users, setUsers] = useState([])



    useEffect(() => {
        fetch('/api/users').then(res => {
            res.json().then(users => {
                setUsers(users)
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

            <div className="max-w-xl mx-auto mt-8">
                <UserTabs isAdmin={true} />
                <div>
                    {users?.map((e) => {

                        return <div key={e._id} className="flex gap-2 p-3 mb-2 rounded-lg bg-gray-100 ">
                            <div className="grid grid-cols-2 gap-3 grow ">
                                {e.name ? <span className="text-gray-900">{e.name} </span> : <span className="italic text-gray-900">No Name </span>}

                                <span className="text-gray-500">{e.email} </span>
                            </div>
                            <div>
                                 <Link className="button"  href={"/users/"+e._id}>تعديل</Link>
                                 </div>

                        </div>




                    })}
                </div>
            </div>
        </>
    )
}