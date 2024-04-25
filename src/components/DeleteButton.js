import {useState} from "react"


export default function DeleteButton({label,onDelete}){

    const [confirm,setConfirm]=useState(false)



if(confirm){

    return(


        <div className="fixed bg-black/90 flex items-center justify-center h-full inset-0">
       <div className="bg-white p-4 rounded-lg">
       <h4 className="text-center my-5 text-xl">هل انت متاكد؟ </h4>
        <div className="flex gap-3 mt-5">
            <button className="button primary "
            
            onClick={
                ()=>{
                    onDelete();
                    setConfirm(false);
                     }
                      }
            
            >نعم</button>
            <button className="button " onClick={()=>setConfirm(false)}>الغاء</button>
        </div>
       </div>
        
        </div>
    )

}

    return(
        <button onClick={()=>setConfirm(true)}>
   {label}
</button>
    )
}