const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false

  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }
  )
    .then(
      (result) => {
        console.log("Product Created")
        res.redirect('/')
      })
    .catch(err => console.log(err))
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.id
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/')
  }
  Product.findByPk(productId).then((product) => {
    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId

  req.user.getProducts({where : {id : prodId}})
  //Product.findByPk(prodId)
  .then((products) => {
    const product = products[0]
    product.title = req.body.title,
      product.imageUrl = req.body.imageUrl,
      product.description = req.body.description,
      product.price = req.body.price
    return product.save();
  })
    .then(() => {
      console.log("Update Product")
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.params.id
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy()
    })
    .then((result) => {
      console.log('Product Deleted')
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}

exports.getProducts = async (req, res, next) => {

  const products = await req.user.getProducts();
  res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin Products',
    path: '/admin/products'
  });
};
