const Product = require('../models/Product')
const User = require('../models/User')

const QueryBuilder = require('../utils/QueryBuilder')

// QUERY PRODUCTS
module.exports.queryProducts = async (params) => {
   const result = await QueryBuilder(params, Product, [
      {
         path: 'owner',
         model: User,
         select: 'firstName lastName username pp',
      },
   ])
   return result
}

// GET PRODUCT
module.exports.getProduct = async (productId) => {
   const product = await Product.findById(productId).populate({
      path: 'owner',
      model: User,
      select: 'firstName lastName username pp',
   })
   return product
}

// CREATE PRODUCT
module.exports.createProduct = async (userId, props) => {
   // extract fields from the props
   const { title, description, image, price } = props
   // create user
   const product = new Product({
      title,
      description,
      image,
      price,
      owner: userId,
   })
   // save user
   const saved = await product.save()
   return saved
}

// UPDATE PRODUCT
module.exports.updateProduct = async (productId, props) => {
   await Product.findByIdAndUpdate(productId, props, { runValidators: true })
}

// DELETE PRODUCT
module.exports.deleteProduct = async (productId) => {
   await Product.deleteOne({ _id: productId })
}
