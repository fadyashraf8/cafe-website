
import Trash from "../icons/Trash.js"
import Plus from "../icons/Plus.js"
import Down from './../icons/Down';
import Up from './../icons/Up';
import { useState } from 'react';



export default function MenuItemPriceProps({ name, addLabel, props, setProps }) {

    const [isOpen, setIsOpen] = useState(false)



    function addProp() {
        setProps(oldProps => {
            return [...oldProps, { name: "", price: 0 }]
        })
    }



    function editProp(ev, index, prop) {
        const newValue = ev.target.value
        setProps(prevSizes => {
            const newSizes = [...prevSizes]
            newSizes[index][prop] = newValue
            return newSizes
        })
    }
    function removeProp(indexToRemove) {
        setProps(prev => prev.filter((v, index) => index !== indexToRemove))
    }


    return (




        <div className='bg-gray-200 p-3 rounded-lg my-2'>
            <button className="border-0 p-1 justify-start inline-flex"
                onClick={() => setIsOpen(prev => !prev)}
                type="button">
                {isOpen === true ?
                    <Up />
                    : <Down />
                }

               
<span>{name}</span>
 <span>({props?.length})</span>
            </button>


            <div className={isOpen ? "block" : "hidden"}>
                {props?.map((e, index) => {
                    return <div key={index} className="flex gap-2 items-center">

                        <div>
                            <label className="text-lg">
                                الاسم
                            </label>
                            <input
                                value={e.name}
                                placeholder=" Name"
                                onChange={ev => editProp(ev, index, "name")}
                                type='text' />
                        </div>

                        <div>
                            <label className="text-lg">
                               سعر الزيادة
                            </label>
                            <input
                                value={e.price}
                                placeholder=" price"
                                onChange={ev => editProp(ev, index, "price")}
                                type='text' />

                        </div>


                        <div>
                            <button
                                type="button"
                                onClick={() => removeProp(index)}
                                className=' bg-white  px-2' >
                                <Trash />
                            </button>
                        </div>
                    </div>

                })}
                <button type='button'
                    onClick={addProp}
                    className='bg-white'>
                    <Plus className="w-4 h-4" />
                    {addLabel}</button>

            </div>
        </div>
    )
}