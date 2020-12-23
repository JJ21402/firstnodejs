var express = require("express");
var router = express.Router();
// ใช้ express-validator ในการตรวจสอบค่าที่จะนำเข้าสู่ db
const { body, validationResult } = require("express-validator");
// ใช้ monk ติดต่อฐานข้อมูล
const url = 'localhost:27017/BlogDB';
const db = require('monk')(url);

router.get("/", function (req, res, next) {
  res.render("blog");
});
router.get("/add", function (req, res, next) {
  res.render("addblog");
});
router.post(
  "/add",
  [
    body("name", "Please input your blog name").not().isEmpty(), //name ต้องไม่เป็นค่าว่างถ้าว่างจะส่งข้อความกลับ
    body("descript", "Please input your description").not().isEmpty(),
    body("author", "Please input author").not().isEmpty()
  ],
  function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        var errors = result.errors;
        res.render('addblog',{errors:errors})
    }else{
        var ct = db.get('blogs');
        ct.insert({
            name:req.body.name,
            description:req.body.descript,
            author:req.body.author
        },function(err,blog){
            if(err){
                res.send(err);
            }else{
                req.flash("success", "Blog recorded");
                res.redirect('/blog/add');
            }
        })
    }
  }
);

module.exports = router;
