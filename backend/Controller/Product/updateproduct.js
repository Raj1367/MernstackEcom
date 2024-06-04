const productModel = require("../../Models/productModel")
const userUploadProductPremission = require("../../Helper/Permission")

async function updateProductController(req, res) {
    try {

        if (!userUploadProductPremission(req.userId)) {
            throw new Error("Permission Denied")
        }

        const { _id, ...resBody } = req.body

        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)

        res.json({
            message: "product updated successfully",
            data: updateProduct,
            success: true,
            erroer: false
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

module.exports=updateProductController