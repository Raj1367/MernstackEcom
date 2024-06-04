const cartproductModel = require("../../Models/cartProductModel")

const updateCartQuantity = async (req, res) => {
    try {
        const currentUserId = req.userId
        const addToCartProductId = req?.body?._id

        const qty = req.body.quantity

        const updateProduct = await cartproductModel.updateOne({ _id: addToCartProductId }, {
            ...(qty && { quantity: qty })
        })

        res.json({
            message: "cart qunatity Updated",
            data: updateProduct,
            error: false,
            success: true
        })


    }
    catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = updateCartQuantity