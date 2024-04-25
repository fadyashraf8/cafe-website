"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link.js";
import { useContext,useState } from "react";
import { CartContext } from "../AppContext.js";
import ShoppingCart from '../icons/ShoppingCart.js';
import Bars2 from '../icons/Bars2.js';



function AuthLinks({ status, userName }) {

  const { cartProducts } = useContext(CartContext)

  if (status === "authenticated") {
    return (
      <>
        <Link className="text-gray-500 font-semibold whitespace-nowrap " href={'/profile'}>
          اهلا, {userName}
        </Link>
        <button onClick={() => signOut({ callbackUrl: '/login' })} className="bg-primary rounded-full text-white px-8 py-2" >تسجيل خروج</button>

        <Link href={'/cart'} className="relative">
          <ShoppingCart />
          {cartProducts?.length > 0 && (
            <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
              {cartProducts.length}
            </span>
          )}
        </Link>

      </>
    )
  }

  if (status === "unauthenticated") {
    return (
      <>
        <Link className="text-gray-500 font-semibold" href={'/login'}>تسجيل دخول</Link>
        <Link className="bg-primary rounded-full text-white px-6 py-2" href={'/register'}>انشاء حساب</Link>
      </>
    )
  }


}


export default function Header() {

  const session = useSession()
  const status = session?.status
  const userData = session?.data?.user
  let userName = userData?.name || userData?.email

  const { cartProducts } = useContext(CartContext)
  const [mobileNavOpen,   setMobileNavOpen] = useState(false);

  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0]
  }




  return (

    <>
      <header >
        <div className="flex md:hidden justify-between items-center">
          <Link className="text-primary font-semibold italic text-2xl" href={'/'}>23 يوليو علي كبر</Link>

          <div className="flex gap-8 items-center">
            <Link href={'/cart'} className="relative">
              <ShoppingCart />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                  {cartProducts.length}
                </span>
              )}
            </Link>
            <button 
            className="p-1 border" 
            onClick={()=>setMobileNavOpen(prev=>!prev)}
                      
            >
              <Bars2 />
            </button>
          </div>
        </div>

        {mobileNavOpen&&(
        <div 
        onClick={()=>setMobileNavOpen(false)}

        className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center">
        <Link href={'/'}>الصفحة الرئيسية</Link>
        <Link href={'/menu'}>المنيو</Link>
        <Link href={'/#about'}>عن المكان</Link>
        <Link href={'/#contact'}>تواصل معنا</Link>
        <AuthLinks status={status} userName={userName} />

      </div>
        )}

        <div className="hidden md:flex items-center justify-between">
          <nav className="flex gap-8 items-center text-gray-500 font-semibold">
            <Link className="text-primary font-semibold italic text-2xl" href={'/'}>23 يوليو علي كبر</Link>

            <Link href={'/'}>الصفحة الرئيسية</Link>
            <Link href={'/menu'}>المنيو</Link>
            <Link href={'/#about'}>عن المكان</Link>
            <Link href={'/#contact'}>تواصل معنا</Link>
          </nav>

          <nav className="flex items-center gap-4 ">
            <AuthLinks status={status} userName={userName} />
          </nav>


        </div>





      </header>
    </>
  )

}