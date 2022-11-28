const express = require('express')


const router = express.Router();

router.get('/add-product' , (req,res,next)=>{
    res.send('<html><form action="/admin/add-product" method="POST"><input type="text" name="message"><input type="text" name="size"><button type="submit">Click Me</button></form></html>')
})

router.post('/add-product' , (req,res)=>{
    
    console.log(req.body)
    res.redirect('/shop')
})

module.exports = router;