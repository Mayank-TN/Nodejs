const express = require('express');
const path = require('path')

const router = express.Router();
const productControllers = require('../controllers/products')

router.get('/contactus' , productControllers.getContactUs )


router.post('/contactus' , productControllers.postContactUs )



module.exports = router