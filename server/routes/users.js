/* ******************************************************** 
* Routes
* File name: users.js
* Author: Explorers Team (Group 1)
* Date: Dec 11, 2022
* ******************************************************** */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
