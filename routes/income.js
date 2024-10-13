const express = require("express");
const router = express.Router();
const { incomeValidation, validate } = require("../utils/validation.js");
const utilities = require("../utils");

const { isAuthenticated } = require("../middleware/authenticate.js");
const incomeController = require("../controllers/income");

router.get("/", utilities.handleErrors(incomeController.getAll));

router.get("/:id", utilities.handleErrors(incomeController.getSingle));

router.post(
  "/",
  isAuthenticated,
  incomeValidation(),
  validate,
  utilities.handleErrors(incomeController.createIncome)
);

router.put(
  "/:id",
  isAuthenticated,
  incomeValidation(),
  validate,
  utilities.handleErrors(incomeController.updateIncome)
);

router.delete(
  "/:id",
  isAuthenticated,
  utilities.handleErrors(incomeController.deleteIncome)
);

module.exports = router;
