import toast from "react-hot-toast";
import Image from "next/image.js";

export default function EditableImage({ link, setLink }) {


    async function handlePhotoChange(e) {
        const files = e.target.files
        if (files?.length === 1) {
            const data = new FormData;
            data.set("file", files[0])
            const uploadPromise = fetch("/api/upload", {
                method: "POST",
                body: data,
            }).then(response => {
                if (response.ok) {
                    return response.json().then(link => {
                        setLink(link);
                    })
                }

            }).catch((error) => {
                console.log(error)
            })

            await toast.promise(uploadPromise, {
                loading: "جاري تحميل الصورة",
                success: "تم تحميل الصورة",
                error: "حاول مرة اخري"
            })
        }
    }


    return (
        <>

            {link && (
                <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt="photo" />
            )}
            {!link && (
                <div className="bg-gray-200 p-4 mb-1 rounded-lg text-gray-500">
                  لا يوجد صورة
                </div>
            )}

            <label>
                <input type="file" className="hidden" onChange={handlePhotoChange} />
                <span className="border block rounded-lg border-gray-300 p-1 cursor-pointer text-center text-xl">تغيير الصورة</span>
            </label>
        </>
    )

}



