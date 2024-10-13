const router = require("express").Router();
router.use("/", require("./swagger"));
const passport = require("passport");

router.get("/", (req, res) => {
  res.send("Hello WORLDS!");
});

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
