const express = require('express')
const path = require('path')

const arr = __dirname.split(`\\`)
arr.pop()



const router = express.Router();

router.get('/add-product' , (req,res,next)=>{
    res.sendFile(path.join(...arr ,'views' ,'add-product.html'))
})

router.post('/add-product' , (req,res)=>{
    
    console.log(req.body)
    res.redirect('/shop')
})

module.exports = router;