
export default function SectionHeaders({firstHeader,secondHeader}) {
    return (
        <>



            <h3 className="uppercase text-gray-600 font-semibold leading-4 ">
                {firstHeader}
            </h3>
            <h2 className="text-primary italic text-4xl font-bold">
                {secondHeader}
                </h2>
        </>
    )
}
