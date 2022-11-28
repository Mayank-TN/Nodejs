const express = require('express')
const app = express()


app.use((req,res,next)=>{
    console.log('in the middleware')
    next()
})

app.use((req,res,next)=>{
    console.log('in the second middleware')
    res.send( { key1: 'value' })
})

app.listen(3000)