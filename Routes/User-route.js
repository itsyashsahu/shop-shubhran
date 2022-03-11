const express = require('express')
const router = express.Router()
const shopDB = require('../mongoose');

router.post('/addUser', shopDB.addUser);

router.post('/login', shopDB.loginCheck);

module.exports = router