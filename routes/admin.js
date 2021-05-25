const path = require('path');
const express = require('express')
const { 
  getAddProduct, 
  createProduct, 
  getProducts, 
  getEditProduct, 
  postEditProduct,
  postDeleteProduct
} = require('../controllers/admin')

const rootDir = require('../utils/path')

const router = express.Router();

// /admin/add-product => Get
router.get('/add-product', getAddProduct)


// /admin/products => Get
router.get('/products', getProducts)

// /admin/add-product => Post
router.post('/add-product', createProduct)

// admin/product/:id => GET
router.get('/edit-product/:productId', getEditProduct)

// /admin/add-product => Post
router.post('/edit-product', postEditProduct)

// /admin/delete-product => DELETE
router.post('/delete-product/:productId', postDeleteProduct)

module.exports = router;

