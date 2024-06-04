const productModel = require("../../Models/productModel")

const getAllProductCategory = async (req, res) => {
    try {
        const { category } = req?.body || req?.query
        const product = await productModel.find({ category })
        res.json({
            data: product,
            message: "product",
            success: true,
            error: false
        })
    }
    catch {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = getAllProductCategory 