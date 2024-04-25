"use client"
import { useState, useEffect } from "react"
import SectionHeader from '../../components/layout/SectionHeaders.js';
import MenuItem from '../../components/Menu/MenuItem.js';
import Loading from './../feed/loading';
import useProfile from "../../components/Menu/UseProfile.js";


export default function MenuPage() {
    const [categories, setCategories] = useState([])
    const [menuItems, setMenuItems] = useState([])
    const { loading, data } = useProfile()


 

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories)
            })
        })
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems)
            })
        })

    }, [])



    if (loading) {
        return <Loading />
    }



    return (
        <>

            <section className="mt-8">


                {categories?.map((c) => {
                    return <div key={c._id} className="text-center" >
                        <SectionHeader className="text-primary text-2xl" secondHeader={c.name} />
                        <div className="grid sm:grid-cols-3 gap-4 mb-8 my-8">
                            {menuItems.filter(item => item.category === c._id).map(item=> {
                              return  <MenuItem key={item._id} {...item} />
                            })}
                        </div>
                    </div>
                })}
            </section>

        </>
    )

}