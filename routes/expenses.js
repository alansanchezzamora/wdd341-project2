const express = require("express");
const router = express.Router();
const utilities = require("../utils");

const { expenseValidation, validate } = require("../utils/validation.js");

const expensesController = require("../controllers/expenses");

router.get("/", utilities.handleErrors(expensesController.getAll));

router.get("/:id", utilities.handleErrors(expensesController.getSingle));

router.post(
  "/",
  expenseValidation(),
  validate,
  utilities.handleErrors(expensesController.createExpense)
);

router.put(
  "/:id",
  expenseValidation(),
  validate,
  utilities.handleErrors(expensesController.updateExpense)
);

router.delete("/:id", utilities.handleErrors(expensesController.deleteExpense));

module.exports = router;
