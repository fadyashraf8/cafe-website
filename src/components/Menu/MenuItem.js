import { useContext, useState } from "react"
import { CartContext } from "../AppContext.js"
import toast from "react-hot-toast"
import MenuItemTile from "./MenuItemTile.js"
import Image from "next/image.js";
import { useSession } from "next-auth/react";

export default function MenuItem(menuItem) {

    const { image, name, desc, ings, sizes, category, basePrice } = menuItem
    const { addToCart } = useContext(CartContext)
const session=useSession()

    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null)
    const [selectedIngs, setSelectedIngs] = useState([])
    const [showPopUp, setShowPopUp] = useState(false)

    function handleAddToCart() {
        if(session?.status==="authenticated"){
            const hasOptions = sizes.length > 0 || ings.length > 0
            if (hasOptions && !showPopUp) {
                setShowPopUp(true)
                return
            }
            addToCart(menuItem, selectedSize, selectedIngs)
            setShowPopUp(false)
            toast.success("Added To Cart!")
        }else{
            toast.error("You Are Not Logged In!")

        }
    }

    function handleIngsClick(e, ing) {
        const checked = e.target.checked
        if (checked) {
            setSelectedIngs(prev => [...prev, ing])
        } else {
            setSelectedIngs(prev => {
                return prev.filter(e => e.name !== ing.name)
            })
        }
    }


    let selectedPrice = basePrice;
    if (selectedSize) {
        selectedPrice += selectedSize.price;
    }
    if (selectedIngs?.length > 0) {
        for (const extra of selectedIngs) {
            selectedPrice += extra.price;
        }
    }

    return (
        <>


            {showPopUp && (
                <div
                    onClick={() => setShowPopUp(false)}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center ">
                    <div onClick={e => e.stopPropagation()}
                        className=" my-8 bg-white p-2 rounded-lg max-w-md ">

                        <div className="overflow-y-scroll p-2"
                            style={{ maxHeight: 'calc(100vh - 100px)' }}>
                            <Image src={image} alt={name} width={300} height={200} className="mx-auto" />
                            <h2 className="text-lg font-bold text-center">{name}</h2>
                            <p className="text-gray-500 text-center text-sm" >{desc}</p>
                            {sizes.length > 0 && (
                                <div className="p-2">
                                    <h3 className="text-xl">أختر الحجم المناسب؟ </h3>


                                    {sizes?.map((size) => {
                                        return <label key={size._id} className="flex flex-row gap-2 justify-start my-3 border rounded-md p-2">
                                            <input
                                                onChange={() => setSelectedSize(size)}
                                                checked={selectedSize?.name === size.name}
                                                type="radio"
                                                name="size" />
                                            {size.name} $ {basePrice + size.price}
                                        </label>
                                    })}
                                </div>
                            )}
                            {ings.length > 0 && (
                                <div className="p-2">
                                    <h3 className="text-xl">أي أضافات؟</h3>
                                    {ings?.map((ing) => {
                                        return <label key={ing._id} className="flex flex-row gap-2 justify-start my-3 border rounded-md p-2">
                                            <input
                                                checked={selectedIngs.map(e => e._id).includes(ing._id)}

                                                onChange={(e) => { handleIngsClick(e, ing) }}
                                                type="checkbox"
                                                name={ing.name} />
                                            {ing.name} $ {ing.price}
                                        </label>
                                    })}
                                </div>

                            )}
                            <button onClick={handleAddToCart}
                                type="button" className="primary sticky bottom-2"> Add To Cart ${selectedPrice}</button>
                            <button type="button" onClick={() => setShowPopUp(false)} className=" my-2">
                                Cancel</button>
                        </div>
                    </div>
                </div>

            )}

            <MenuItemTile onAddToCart={handleAddToCart} {...menuItem} />
        </>
    )
}
