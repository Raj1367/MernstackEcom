const stripe = require("../../config/Stripe")
const orderModel = require("../../Models/userOrderModel")
const cartProductModel = require("../../Models/cartProductModel")

const endpointSecret = "whsec_62811047f17a66a3ead5c1d7cb9412a80e85b9c9d4ef8b0d54f094bf8a189cdc"

const getLineItems = async (lineItems) => {
    let productItems = []

    if (lineItems.data.length) {
        for (const item of lineItems.data) {
            const product = await stripe.products.retrieve(item.price.product)
            const productId = product.metadata.productId

            const productData = {
                productId: productId,
                name: product.name,
                price: item.price.unit_amount / 100,
                quantity: item.quantity,
                image: product.images
            }
            productItems.push(productData)

        }
    }

    return productItems
}

const webhooks = async (req, res) => {

    const sig = req.headers['stripe-signature'];

    const payloadString = JSON.stringify(req.body)

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret,
    })

    let event;

    try {
        event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
            const productDetails = await getLineItems(lineItems)

            const orderDetails = {
                productDetails: productDetails,
                email: session.customer_email,
                userId: session.metadata.userId,
                paymentDetails: {
                    paymentId: session.payment_intent,
                    payment_method_type: session.payment_method_types,
                    payment_status: session.payment_status,
                },
                totalAmount: session.amount_total / 100
            }

            const userOrder = new orderModel(orderDetails)
            const saveOrder = await userOrder.save()

            if (saveOrder?._id) {
                const deletecartItems = await cartProductModel.deleteMany({ userId: session.metadata.userId })
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send();

}

module.exports = webhooks