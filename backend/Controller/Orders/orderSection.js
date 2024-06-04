const checkoutCartModel = require("../../Models/userCheckoutModel")

const getOrdersController = async (req, res) => {
    try {
        const UserCheckoutDetails = await checkoutCartModel.find()
        res.json({
            message: "All Checkoutuser details",
            success: true,
            error: false,
            data: UserCheckoutDetails
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }

}

module.exports = getOrdersController