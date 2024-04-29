"use client"
import { signIn } from "next-auth/react"
import Link from "next/link.js"
import Image from "next/image";

import { useState } from "react"

export default function Register() {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [creatingUser, setCreatingUser] = useState(false)
    const [createdUser, setCreatedUser] = useState(false)
    const [error, setError] = useState(false)


    async function handleFormSubmit(e) {
        e.preventDefault();
        setCreatingUser(true)
        setError(false)
        setCreatedUser(false)
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {

            setCreatedUser(true)
        } else {

            setError(true)
        }
        setCreatingUser(false)
    }

    return (
        <>

            <div className="  my-10 flex justify-center items-center">
                <div className="grow ">
                    <div>
                        <h1 className="text-primary text-4xl text-center">انشاء حساب</h1>
                        {createdUser && (
                            <div className="my-4 text-center text-lg">
                                تم انشاء الحساب.<br /> <Link className='underline' href='/login'>تسجيل دخول</Link>
                            </div>
                        )}
                        {error && (
                            <div className="my-4 text-center">
                                An Error has occured.<br />
                                Please try again later
                            </div>
                        )}
                        <form className="block max-w-xs mx-auto my-4" onSubmit={handleFormSubmit}>
                            <input type="email" placeholder="البريد الالكتروني" disabled={creatingUser}
                                value={email} onChange={e => setEmail(e.target.value)} />
                            <input type="password" placeholder="كلمة السر" disabled={creatingUser} value={password} onChange={e => setPassword(e.target.value)} />
                            <button type="submit" disabled={creatingUser}>
                                انشاء حساب
                            </button>
                            <div className="my-4 text-center text-gray-500">
                                or login with provider
                            </div>

  

                        </form>


                        <div className="my-5  p-4 text-center">
                            لديك حساب بالفعل؟{"   "} <Link className="underline text-2xl" href="/login">تسجيل دخول</Link>
                        </div>
                    </div>

                </div>

            </div>

        </>
    )

}
