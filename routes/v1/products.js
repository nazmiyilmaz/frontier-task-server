const express = require('express')

const router = express.Router()

const { protect } = require('../../middlewares/auth')

const {
   createProduct,
   updateProduct,
   deleteProduct,
   getProducts,
   getSingleProduct,
} = require('../../controllers/products')

// GET PRODUCTS
router.get('/', getProducts)

// GET SINGLE PRODUCT
router.get('/:productId', getSingleProduct)

// CREATE PRODUCT
router.post('/', protect, createProduct)

// UPDATE PRODUCT
router.put('/:productId', protect, updateProduct)

// DELETE PRODUCT
router.delete('/:productId', protect, deleteProduct)

module.exports = router
