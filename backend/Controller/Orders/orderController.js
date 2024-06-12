const orderModel = require("../../Models/userOrderModel")

const orderController = async (req, res) => {
    try {
        const currentUserId = req.userId

        const orderList = await orderModel.find({ userId: currentUserId }).sort({ createdAt: -1 })
        res.json({
            data: orderList,
            message: "orderList",
            error: false,
            success: true
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = orderController