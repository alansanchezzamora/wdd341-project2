const express = require("express");
const router = express.Router();
const { incomeValidation, validate } = require("../utils/validation.js");
const utilities = require("../utils");

const incomeController = require("../controllers/income");

router.get("/", utilities.handleErrors(incomeController.getAll));

router.get("/:id", utilities.handleErrors(incomeController.getSingle));

router.post(
  "/",
  incomeValidation(),
  validate,
  utilities.handleErrors(incomeController.createIncome)
);

router.put(
  "/:id",
  incomeValidation(),
  validate,
  utilities.handleErrors(incomeController.updateIncome)
);

router.delete("/:id", utilities.handleErrors(incomeController.deleteIncome));

module.exports = router;
