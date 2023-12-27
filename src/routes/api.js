const express = require('express')
const router = express.Router()
const {getAllProducts, createProduct, getProductDetails, updateProduct, deleteProduct, getByCategory} = require('../controllers/productsController')
const {createCategory, getAllCategory} = require('../controllers/categoryController')
const upload = require('../helpers/multer')

router.route('/products')
  .get(getAllProducts) // Get all products
  .post(upload.array('photos',10),createProduct)  // Create new product

router.route('/products/:productId')
  .get(getProductDetails) // Get the specific product details
  .post(upload.array('photos',10), updateProduct) // Update the specific product
  .delete(deleteProduct)  //Delete the product

router.get('/category/:categoryId', getByCategory)

router.route('/category')
  .get(getAllCategory)
  .post(upload.single('categoryImg'), createCategory)



module.exports = router;