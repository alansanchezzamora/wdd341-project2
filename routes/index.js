const router = require("express").Router();
router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  res.send("Hello WORLDS!");
});

router.use("/expenses", require("./expenses"));

router.use("/income", require("./income"));

module.exports = router;
