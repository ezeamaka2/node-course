const path = require('path');
const express = require('express')
const { 
  getIndex, 
  getallProducts, 
  getCart, 
  getCheckOut, 
  getOrder, 
  getProductDetail,
  postCart,
postCartDelete} = require('../controllers/shop')




const router = express.Router()

router.get('/', getIndex)

router.get('/products', getallProducts)

router.get('/cart', getCart)

router.post('/cart', postCart)

router.post('/cart-delete-item/:productId', postCartDelete)

router.get('/product-detail/:productId', getProductDetail)

router.get('/checkout', getCheckOut)

router.get('/orders', getOrder)




module.exports = router;