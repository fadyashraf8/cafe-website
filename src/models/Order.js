import { Schema, model, models } from "mongoose";


const OrderSchema = new Schema({
    userEmail: String,
    phone: String,
    stAddress: String,
    anotherPhone: String,
    city: String,
    country: String,
    cartProducts: Object,
    paid: {type: Boolean, default: false},
    tableNumber: String,
    deliveryOption: String,

  }, {timestamps: true});

export const Order = models?.Order || model("Order", OrderSchema)