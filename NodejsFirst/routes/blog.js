var express = require("express");
var router = express.Router();
// ใช้ express-validator ในการตรวจสอบค่าที่จะนำเข้าสู่ db
const { body, validationResult } = require("express-validator");

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

    }
  }
);

module.exports = router;
