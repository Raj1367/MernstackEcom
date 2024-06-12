const stripe = require("../../config/Stripe")
const userModel = require("../../Models/userModel")

const paymentController = async (req, res) => {

    try {

        const { cartData } = req.body
        console.log("cartItems", cartData)

        const curentuser = await userModel.findOne({ _id: req.userId })

        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            customer_email: curentuser.email,
            metadata: {
                userId: req.userId
            },
            line_items: cartData.map((item, index) => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.productId.productName,
                            images: item.productId.productImage,
                            metadata: {
                                productId: item.productId._id
                            }
                        },
                        unit_amount: item.productId.sellingPrice * 100
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1
                    },
                    quantity: item.quantity
                }
            }),

            success_url: `${process.env.FRONTEND_URL}/paymentsuccess`,
            cancel_url: `${process.env.FRONTEND_URL}/paymentfailed`
        }

        const session = await stripe.checkout.sessions.create(params);
        res.status(303).json(session)
    }

    catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = paymentController