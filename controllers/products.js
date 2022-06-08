const ProductService = require('../services/ProductService')

const asyncHandler = require('../middlewares/async')

// GET PRODUCTS
module.exports.getProducts = asyncHandler(async (req, res, next) => {
   const params = req.query
   const result = await ProductService.queryProducts(params)
   res.status(200).json(result)
})

// GET SINGLE PRODUCT
module.exports.getSingleProduct = asyncHandler(async (req, res, next) => {
   const productId = req.params.productId
   const product = await ProductService.getProduct(productId)
   res.status(200).json({ success: true, data: product })
})

// CREATE PRODUCT
module.exports.createProduct = asyncHandler(async (req, res, next) => {
   const props = req.body
   const owner = req.user?._id
   const product = await ProductService.createProduct(owner, props)
   res.status(200).json({ success: true, data: product })
})

// UPDATE PRODUCT
module.exports.updateProduct = asyncHandler(async (req, res, next) => {
   const productId = req.params.productId
   const props = req.body
   await ProductService.updateProduct(productId, props)
   res.status(200).json({ success: true, data: null })
})

// DELETE PRODUCT
module.exports.deleteProduct = asyncHandler(async (req, res, next) => {
   const productId = req.params.productId
   await ProductService.deleteProduct(productId)
   res.status(200).json({ success: true, data: null })
})
