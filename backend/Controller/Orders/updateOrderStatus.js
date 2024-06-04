const userCheckoutModel = require("../../Models/userCheckoutModel")

async function updateOrderStatus(req, res) {
    try {

        const sessionUser = req.userId

        const { userId, orderId, name, email, contact, status } = req.body

        const payload = {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(status && { status: status }),
        }

        const user = await userCheckoutModel.findById(sessionUser)
        const updateUser = await userCheckoutModel.findByIdAndUpdate(userId, payload)

        res.json({
            data: updateUser,
            message: "User Updated",
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateOrderStatus