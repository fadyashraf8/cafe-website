import { cartProductPrice } from "../AppContext.js";
import Trash from "../icons/Trash.js";
import  Image  from 'next/image';

export default function ProductCart({ product, onRemove }) {
    return (
        <div className="flex items-center justify-between gap-4 mb-2 border-b py-2 ">
            <div className="w-24">
                <Image src={product.image} alt={'ok'} width={240} height={240} />

            </div>

            <div >
                <h3 className="text-xl font-semibold">
                    {product.name}
                </h3>
                {product?.size && (
                    <div className="text-sm text-gray-700 my-1" >Size: 
                    <span> {product.size.name}</span>  </div>
                )}

                {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500 ">

                        {product.extras.map(extra => (
                            <div className="my-1" key={extra.name}> {extra.name} ${extra.price}  </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="text-lg font-semibold">
                ${cartProductPrice(product)}
            </div>
            {!!onRemove && (
                <div className="ml-2">
                    <button
                        type="button"
                        onClick={() => onRemove(product._id)}
                        className="p-2">
                        <Trash />
                    </button>
                </div>
            )}
        </div>

    )
}


