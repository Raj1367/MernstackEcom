const checkoutCartModel = require("../../Models/userCheckoutModel")

async function userCheckoutController(req, res) {
    try {

        const userId = req.userId

        const {
            firstName,
            lastName,
            email,
            contact,
            addressLine1,
            addressLine2,
            landmark,
            state,
            city,
            postalCode,
        } = req.body

        if (!firstName) {
            throw new Error("Please provide firstname")
        }
        if (!lastName) {
            throw new Error("Please provide lastname")
        }
        if (!email) {
            throw new Error("Please provide email")
        }

        if (!contact) {
            throw new Error("Please provide contact")
        }

        if (!addressLine1) {
            throw new Error("Please provide addressLine1")
        }
        if (!addressLine2) {
            throw new Error("Please provide addressLine2")
        }
        if (!landmark) {
            throw new Error("Please provide landmark")
        }
        if (!state) {
            throw new Error("Please provide state")
        }
        if (!city) {
            throw new Error("Please provide city")
        }
        if (!postalCode) {
            throw new Error("Please provide postalCode")
        }

        const payload = {
            ...req.body,
            qty: req.body.quantity,
            userId: userId,
        }

        const userCheckoutData = new checkoutCartModel(payload)
        const saveUserCheckout = await userCheckoutData.save()

        res.json({
            data: saveUserCheckout,
            success: true,
            error: false,
            message: "User checked out successfully"
        })


    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userCheckoutController