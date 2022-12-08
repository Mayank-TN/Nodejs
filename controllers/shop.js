const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = async (req, res, next) => {
  const products = await Product.findAll();
  res.render('shop/product-list', {
    prods: products,
    pageTitle: 'All Products',
    path: '/products'
  });
};

exports.getProduct = (req,res)=>{
  Product.findByPk(req.params.id).then(
    (product)=>{
      
      res.render('shop/product-detail' , {
        product : product ,
        path : '/products' ,
        pageTitle : product.title
      })
    }
  )
}

exports.getIndex = async (req, res, next) => {
  const products = await Product.findAll();
  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/'
  });

};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId , (prod)=>{
    Cart.addProduct(productId , prod.price)
  })
  res.redirect('/cart')
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
