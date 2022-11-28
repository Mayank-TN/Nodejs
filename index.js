const express = require('express');
var bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended : false}))




app.use('/add-product' , (req,res,next)=>{
    res.send('<html><form action="/product" method="POST"><input type="text" name="message"><input type="text" name="size"><button type="submit">Click Me</button></form></html>')
})

app.use('/product' , (req,res)=>{
    res.redirect('/add-product')
    
    console.log(req.body)
})

app.use('/' , (req,res)=>{
    res.send('Hello world')
})



app.listen(3000)