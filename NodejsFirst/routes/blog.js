var express = require('express');
var router = express.Router();


router.get('/',function(req, res, next){
    res.render('blog');
})
router.get('/add',function(req, res, next){
    res.render('addblog');
})

module.exports = router;