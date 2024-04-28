import mongoose from "mongoose"
import { getServerSession } from "next-auth";
import authOptions  from '../../authOptions.js';
import { MenuItem } from './../../../models/MenuItems';
import { Order } from './../../../models/Order';



export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL)

    const { cartProducts, address,tableNumber,deliveryOption } = await req.json()
    const session = await getServerSession(authOptions)
    const userEmail = session?.user?.email

    const orderDoc = await Order.create({
        userEmail,
        ...address,
        cartProducts,
        tableNumber,
        deliveryOption,
        paid: false
    })
    const redirectUrl = `${process.env.NEXTAUTH_URL}orders/${orderDoc._id}?clear-cart=1`;

    return Response.json({redirectUrl,orderDoc})

}
