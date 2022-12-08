const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing : false
 
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null , title, imageUrl, description, price);
  product.save().then( ()=>{
    res.redirect('/')
  });
  
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.id
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/')
  }
  Product.findById(productId , (product)=>{
    if(!product){
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing : editMode ,
      product : product
    });
  })
};

exports.postEditProduct = (req,res,next)=>{
  const prodId = req.body.productId
  const updatedProd = new Product(prodId , req.body.title , req.body.imageUrl , req.body.description , req.body.price)
  updatedProd.save();
  res.redirect('/admin/products')

}

exports.postDeleteProduct = (req,res,next)=>{
  const prodId = req.params.id
  Product.deleteById(prodId)
  .then( ()=>{
    res.redirect('/admin/products')
  })
  .catch(err=>console.log(err))
}

exports.getProducts = async (req, res, next) => {

  const [products, fieldData] = await Product.fetchAll();
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
};
