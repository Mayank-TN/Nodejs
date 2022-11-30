const express = require('express');
var bodyParser = require('body-parser');
const path = require('path')


const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const contactusRouter = require('./routes/contactus')
const successRouter = require('./routes/success')

const app = express()

app.use(express.static(path.join(__dirname , 'public')))
app.use(bodyParser.urlencoded({extended : false}))

app.use('/admin' ,adminRouter)
app.use('/shop' ,shopRouter)
app.use(contactusRouter)
app.use(successRouter)

app.get('*' , (req,res)=>{
    res.status(404)
    res.sendFile(path.join(__dirname , 'views' , 'error.html'))
})




app.listen(3000)