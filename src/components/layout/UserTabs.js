"use client"
import Link from "next/link";
import { usePathname } from "next/navigation.js";

export default function UserTabs({isAdmin}){

const path =usePathname()

return(

    <div className="inline-flex flex-wrap gap-4 tabs justify-center w-full my-7">

    <Link href="/profile" className={path==="/profile"?"active text-xl":"text-xl"}>حسابك الشخصي</Link>
{isAdmin&&(
   <>
    <Link href="/categories" className={path==="/categories"?"active text-xl":"text-xl"}>الاقسام</Link>
    <Link href="/menu-items" className={path.includes("/menu-items")?"active text-xl":"text-xl"}>عناصر المنيو</Link>
    <Link href="/users" className={path.includes("/users")?"active text-xl":"text-xl"}>المستخدمين</Link>
   </>
)}
    <Link href="/orders" className={path==="/orders"?"active text-xl":"text-xl"}>الطلبات</Link>

</div>
)

}