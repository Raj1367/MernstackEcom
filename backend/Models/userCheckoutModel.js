const mongoose = require('mongoose')

const checkoutCartSchema = new mongoose.Schema({
    userId: String,
    firstName: String,
    lastName: String,
    email: String,
    contact: Number,
    addressLine1: String,
    addressLine2: String,
    landmark: String,
    state: String,
    city: String,
    postalCode: String,
    totalQuantity: Number,
    userCheckoutData:[],
    orderTotal: Number,

}, {
    timestamps: true
})


const checkoutCartModel = mongoose.model("usercheckout", checkoutCartSchema)
module.exports = checkoutCartModel