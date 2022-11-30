const express = require('express');
const path = require('path')

const router = express.Router();

router.get('/contactus' , (req,res)=>{
    res.sendFile(path.join(__dirname , '../' , 'views' , 'contactus.html'))
})


router.post('/contactus' , (req,res)=>{
   console.log(req.body)
   res.redirect('/success')
})



module.exports = router