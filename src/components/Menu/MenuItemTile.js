


export default function MenuItemTile({onAddToCart,...item}){


    const{image,name,desc,basePrice,sizes,ings}=item

    return(


        <div className="text-center bg-gray-200 hover:bg-white hover:shadow-md hover:shadow-black/25 hover:border hover:border-black/50 hover:rounded-lg rounded transition-all p-5 flex items-center justify-center flex-col ">
        <div className="text-center">
            <img src={image} alt='pizza' className="max-h-auto max-h-24 block mx-auto" />
        </div>
        <h4 className="font-semibold text-3xl my-3 ">{name}</h4>
        <p className="text-gray-500 text-sm line-clamp-3">{desc}</p>

        <button onClick={onAddToCart}
            className="bg-primary rounded-full px-8 py-2 my-3 text-white">
                {(sizes.length>0||ings.length>0)?(
                    <span className="text-lg">اضف الي طلبك <br/>(من جم{basePrice})</span>
                ):(
                    <span className="text-lg">اضف الي طلبك <br/> {basePrice} جم</span>
                )}
             </button>
    </div>
    )
}