const express = require('express')
const router = express.Router()
const shopDB = require('../mongoose');

router.post('/addShop', shopDB.addShop);
 
router.get('/getShop', shopDB.getShops);

router.delete('/deleteShop/:id', shopDB.deleteShops);

router.put('/editShop/:id', shopDB.editShops);

module.exports = router