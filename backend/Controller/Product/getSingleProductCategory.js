const productModel = require("../../Models/productModel")

const getProductCategory = async (req, res) => {
    try {
        // uniqueness
        const productCategory = await productModel.distinct("category")
        console.log("category", productCategory)

        // array to store one product of each category
        const productByCategory = []

        for (const category of productCategory) {
            const product = await productModel.findOne({category})

            if (product) {
                productByCategory.push(product)
            }
        }

        res.json({
            message: "Category Product",
            data: productByCategory,
            succcess: true,
            error: false,
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

module.exports = getProductCategory