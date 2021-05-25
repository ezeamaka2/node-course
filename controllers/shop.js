const Product = require('../models/InitialProduct');
const Cart = require('../models/Cart')


exports.getallProducts = (req, res, next) => {
  Product.fetchAll(product => {
  res.render('shop/product-list', {prods: product, docTitle: 'All Products', path: '/products'})
  });
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(product => {
    res.render('shop/index', {prods: product, docTitle: 'Shop', path: '/'})
    });
}

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProduct =[]
      for(product of products){
        const cartProductData = cart.products.find(prod => prod.id === product.id)
        if(cartProductData){
          cartProduct.push({productData: product, qty: cartProductData.qty})
        }
      }
      res.render('shop/cart', {products: cartProduct, docTitle: 'Cart', path: '/cart'})
    })
  })
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price)
  }) 
  res.redirect('/cart')
}

exports.postCartDelete = (req, res, next) =>{
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price)
    res.redirect('/cart')
  })
  
}

exports.getOrder = (req, res, next) => {
  res.render('shop/orders', {docTitle: 'Order', path: '/orders'})
}

exports.getCheckOut = (req, res, next) => {
  Product.fetchAll(product => {
    res.render('shop/checkout', {prods: product, docTitle: 'Checkout', path: '/'})
    });
}

exports.getProductDetail = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {prods: product, docTitle: product.title, path: '/product'})
  })
}

