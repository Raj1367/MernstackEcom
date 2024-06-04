const userUploadProductPremission = require("../../Helper/Permission")
const productModel = require("../../Models/productModel")

async function UploadProductController(req, res) {
    try {

        const sessionUserId = req.userId

        if (!userUploadProductPremission(sessionUserId)) {
            throw new Error("Permission Denied")
        }

        const UploadProduct = new productModel(req.body)
        const saveProduct = await UploadProduct.save()
        
        res.status(201).json({
            message: "product uploaded successfully",
            error: false,
            success: true,
            data: saveProduct
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = UploadProductController