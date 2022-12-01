const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  }

exports.postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
  }

exports.getProducts = (req, res, next) => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  }

exports.getContactUs = (req,res)=>{
    res.render('contactus' , {
        pageTitle: 'Contact Us',
        path: '/contactus',
        formsCSS: true,
      })
}

exports.postContactUs = (req,res)=>{
    console.log(req.body)
    res.redirect('/success')
 }

 exports.getSuccessContactUs = (req,res)=>{
    res.render('success' , {
        pageTitle: 'Connected successfully',
        path: '/success',
        formsCSS: true,
      })
 }
