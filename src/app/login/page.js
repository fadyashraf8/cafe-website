"use client"

import { signIn, useSession } from "next-auth/react"
import Link from "next/link.js"
import { useState } from "react"
import Image from "next/image";





export default function Login() {

    const { session } = useSession()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginProg, setLoginProg] = useState(false)

    async function handleFormSubmit(e) {
        e.preventDefault();
        setLoginProg(true)
        await signIn('credentials', { email, password, callbackUrl: '/' })

        setLoginProg(false)
    }



    return (
        <>




            <div className="my-10 text-center ">
                <h1 className="text-primary text-4xl">تسجيل دخول</h1>

                <form className="block max-w-xs mx-auto my-4" onSubmit={handleFormSubmit}>
                    <input type="email" placeholder="البريد الالكتروني"
                        value={email} onChange={e => setEmail(e.target.value)}
                        name="email" disabled={loginProg} />
                    <input type="password" placeholder="كلمة السر"
                        value={password} onChange={e => setPassword(e.target.value)}
                        name="password" disabled={loginProg} />
                    <button type="submit" disabled={loginProg}>
                        تسجيل دخول
                    </button>

                </form>


                <div className="my-5  p-4">
                    ليس لديك حساب؟{"   "} <Link className="underline text-2xl" href="/register">انشاء حساب</Link>
                </div>

            </div>
        </>
    )
}
