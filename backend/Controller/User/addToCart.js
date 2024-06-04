const cartproductModel = require("../../Models/cartProductModel")

const addToCartController = async (req, res) => {
    try {
        const { productId } = req?.body
        const currentUser = req.userId

        const productAvailable = await cartproductModel.findOne({ productId })

        if (productAvailable) {
            return res.json({
                message: "already exits in add to cart",
                success: false,
                error: true
            })
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        }

        const newProductToCart = cartproductModel(payload)
        const saveproduct = await newProductToCart.save()

        res.json({
            data: saveproduct,
            message: "product added to cart",
            success: true,
            error: false
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

module.exports = addToCartController