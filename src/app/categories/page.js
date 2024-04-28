"use client"
import UserTabs from './../../components/layout/UserTabs';
import Loading from './../feed/loading';


import useProfile from './../../components/Menu/UseProfile';
import DeleteButton from './../../components/DeleteButton';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Categories() {

    const [categoryName, setCategoryName] = useState("")
    const [categories, setCategories] = useState([])
    const [editedCategory, setEditedCategory] = useState(null)
    const { loading, data } = useProfile()



    useEffect(() => {
        fetchCategories()
    }, [])

    if (loading) {
        return <Loading />
    }

    if (!data.admin) {

        return "You Are Not An Admin"
    }


    function fetchCategories() {
        fetch("/api/categories").then(res => {
            res.json().then(categories => {
                setCategories(categories)
            })
        })
    }



    async function handleSubmitCategory(e) {
        e.preventDefault()

        const data = { name: categoryName }
        if (editedCategory) {
            data._id = editedCategory._id
        }
        const creationPromise = new Promise(async (resolve, reject) => {
            const response = await fetch("/api/categories", {
                method: editedCategory ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            setCategoryName('')
            fetchCategories()
            setEditedCategory(null)
            if (response.ok) {
                resolve()
            } else {
                reject()
            }

            await toast.promise(creationPromise, {
                loading: editedCategory ? "Updating Your New Category" : "Creating Your New Category",
                success: editedCategory ? "Updated Category!" : "Category Created!",
                error: "ERROR"
            })
        })


    }



    async function handleDeleteClick(_id) {

        const DeletePromise = new Promise(async (resolve, reject) => {
            const response = await fetch("/api/categories?_id=" + _id, {
                method: 'DELETE',

            })
            setCategoryName('')

            if (response.ok) {
                resolve()
            } else {
                reject()
            }



            await toast.promise(DeletePromise, {
                loading: "Deleting Your  Category",
                success: "Category Deleted!",
                error: "ERROR"
            })

            fetchCategories()

        })




    }

    return (


        <>
            <section className="mt-8 max-w-xl mx-auto">
                <UserTabs isAdmin={true} />

                <form className="mt-8" onSubmit={handleSubmitCategory}>
                    <div className="flex gap-2 items-end justify-center">
                        <div className='grow'>
                            <label className="text-xl">
                                {editedCategory ? "تعديل اسم القسم" : "قسم جديد"}
                                {editedCategory && (
                                    <>:   <b>{editedCategory.name}</b></>
                                )}
                            </label>
                            <input  type='text'
                                value={categoryName}
                                onChange={e => setCategoryName(e.target.value)}
                            />
                        </div>
                        <div className='pb-4 flex gap-1'>
                            <button type="submit" className="border border-primary mt-0 mb-0 ">
                                {editedCategory ? "تحديث" : "انشاء"}
                            </button>
                            <button type="button"
                                onClick={() => {
                                    setEditedCategory(null)
                                    setCategoryName('')

                                }}
                            >الغاء</button>
                        </div>
                    </div>
                </form>
                <div>
                    <h2 className='mt-8  text-gray-500 text-lg'>الاقسام الموجودة :</h2>
                    {categories.length > 0 && categories.map((c) =>
                        <div key={c._id} className="bg-gray-100 rounded-xl p-2 px-4 flex items-center gap-1  mb-3 ">

                            <div
                                className="grow text-lg" > {c.name} </div >



                            <div className="flex gap-2" >
                                <button
                                    onClick={() => {
                                        setEditedCategory(c)
                                        setCategoryName(c.name)
                                    }}
                                    type="button ">تعديل</button>


                                <DeleteButton label={"مسح"} onDelete={() => handleDeleteClick(c._id)} />
                            </div>
                        </div>
                    )}
                </div>

            </section >
        </>
    )
}