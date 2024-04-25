

export default function Indoor({ tableNumber, setTableNumber, disabled = false }) {


    return (

        <>

            <label>Table Number</label>
            <input
            required
                disabled={disabled} value={tableNumber || ""}
                onChange={e => setTableNumber( e.target.value)}
                type="text" placeholder="Table Number" />
        </>
    )
}