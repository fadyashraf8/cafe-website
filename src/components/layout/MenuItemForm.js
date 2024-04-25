
import { useState, useEffect } from 'react';
import EditableImage from "./EditableImage.js"

import MenuItemPriceProps from './MenuItemPriceProps';



export default function MenuItemForm({ onSubmit, menuItem }) {

    const [image, setImage] = useState(menuItem?.image || "")
    const [name, setName] = useState(menuItem?.name || "")
    const [desc, setDesc] = useState(menuItem?.desc || "")
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "")

    const [sizes, setSizes] = useState(menuItem?.sizes || [])
    const [ings, setIngs] = useState(menuItem?.ings || [])

    const [category, setCategory] = useState(menuItem?.category || "");
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        fetch('/api/categories').then(res => {
          res.json().then(categories => {
            setCategories(categories);
          });
        });
      }, []);   

    return (


        <form className="mt-8 max-w-2xl mx-auto"
            onSubmit={e =>
                onSubmit(e, {
                    image, name, desc, basePrice, sizes, ings,category
                })}
        >
            <div  className="md:grid items-start gap-4"
        style={{gridTemplateColumns:'.3fr .7fr'}}>
                <div >
                    <EditableImage link={image} setLink={setImage} />

                </div>

                <div className='grow'>
                    <label className="text-lg">
                        اسم العنصر
                    </label>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type='text' />
                    <label className="text-lg">
                        الوصف
                    </label>
                    <input
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        type='text' />
                    <label className="text-lg">
                        القسم
                    </label>
                    <select value={category}  onChange={e => setCategory(e.target.value)}>
                        <option >
                            None
                        </option>
                        {categories?.map((c) => {
                         return <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        })}
                    </select>
                    <label className="text-lg">
                        السعر الاساسي
                    </label>
                    <input
                        value={basePrice}
                        onChange={e => setBasePrice(e.target.value)}
                        type='text' />

                    <MenuItemPriceProps name={"الاحجام"} addLabel={"اضافة حجم للعنصر"} props={sizes} setProps={setSizes} />
                    <MenuItemPriceProps name={"الاضافات"} addLabel={"زيادة اضافة للعنصر"} props={ings} setProps={setIngs} />
                    <button className="text-lg" type='submit'> حفظ</button>
                </div>

            </div>
        </form>
    )
}