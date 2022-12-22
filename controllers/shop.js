const Product = require('../models/product');
const Cart = require('../models/cart')
const CartItem = require('../models/cart-item')

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
  
  req.user.getCart().then((cart)=> {
    cart.getProducts().then(products=>{
      res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products : products
        });
    })
    
  })
  .catch(err => console.log(err));

};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let fetchedCart;
  req.user.getCart()
  .then(cart=>{
    fetchedCart = cart;
    return cart.getProducts({where : {id: productId}})
  })
  .then(products=>{
    let product
    if(products.length>0){
      product = products[0];
    }
    let newQuantity = 1
    if(product){
      const oldQuantity = product.cartItem.quantity
      newQuantity = oldQuantity + 1;
    }
    return Product.findByPk(productId)
    .then(product=>{
      return fetchedCart.addProduct(product , {through : {quantity : newQuantity}})
    })
    .then(()=> {
      res.redirect('/cart')
    })
    .catch(err=>console.log(err));
    
    
  })
  .catch(err=>console.log(err))
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


exports.postCartDeleteItem = (req,res,next)=>{
  const prodId = req.body.productId
  CartItem.findAll({where : {productId : prodId}})
  .then(item=>{
    const product = item[0]
    return product.destroy();
  })
  .then( ()=> res.redirect('/cart'))
  .catch(err=>console.log(err))
}


