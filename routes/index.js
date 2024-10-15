const router = require("express").Router();
const passport = require("passport");

router.use("/", require("./swagger"));
router.use("/expenses", require("./expenses"));
router.use("/income", require("./income"));

router.get("/login", passport.authenticate("github"), (req, res) => {});
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});







module.exports = router;
