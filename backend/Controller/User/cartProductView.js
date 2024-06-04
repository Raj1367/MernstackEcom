const cartproductModel = require("../../Models/cartProductModel")

const cartProductView = async (req, res) => {
    try {
        const currentUser = req.userId
        const allproducts = await cartproductModel.find({
            userId: currentUser
        }).populate("productId")

        res.json({
            data: allproducts,
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

module.exports = cartProductView