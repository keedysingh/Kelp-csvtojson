var express = require('express');
var router = express.Router();
var uc=require('../controller/user.controller').uc

router.get('/csv',uc.convertCSV);
router.get('/list',uc.getUser);

module.exports = router;
