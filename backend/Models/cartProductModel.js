const mongoose = require('mongoose')

const cartproductSchema = new mongoose.Schema({
    productId: {
        ref:"product",
        type:String
    },
    quantity: Number,
    userId: String,
}, {
    timestamps: true
})


const cartproductModel = mongoose.model("cartproduct", cartproductSchema)

module.exports = cartproductModel