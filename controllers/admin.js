const Product = require('../models/InitialProduct');

exports.getAddProduct = (req, res, next) => {
  console.log('in another middleware!!!')
  res.render('admin/edit-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
}

exports.createProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description
  const product = new Product(null, title, imageUrl, description, price)
  product.save();
  res.redirect('/')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(product => {
    res.render('admin/products', {prods: product, docTitle: 'Admin Products', path: '/admin/products'})
    });
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if(!editMode){
    res.redirect('/');
  }

  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if(!prodId)(
      res.redirect('/')
    )
    res.render('admin/edit-product', {
      docTitle: 'Edit Product',
      path: '/admin/edit-product', 
      editing: editMode,
      prod: product
      })
  })  
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  const updatedProduct = new Product(
    prodId, 
    updatedTitle,
    updatedImageUrl,
    updatedDescription,
    updatedPrice
    );
    updatedProduct.save()

  res.redirect('/admin/products')
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.deleteById(prodId)
  res.redirect('/admin/products')

}