const cartproductModel = require("../../Models/cartProductModel")

const deleteAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId
        const addToCartProductId = req.body._id

        const deleteProduct = await cartproductModel.deleteOne({ _id: addToCartProductId })

        res.json({
            message: "Product removed from cart successfully",
            error: false,
            success: true,
            data: deleteProduct
        })

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = deleteAddToCartProduct