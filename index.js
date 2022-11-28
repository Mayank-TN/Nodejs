const express = require('express');
var bodyParser = require('body-parser');


const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

const app = express()
app.use(bodyParser.urlencoded({extended : false}))

app.use('/admin' ,adminRouter)
app.use('/shop' ,shopRouter)

app.get('*' , (req,res)=>{
    res.status(404)
    res.send('<h1>Error, a page not found</h1>')
})




app.listen(3000)