const router = require("express").Router();
const utilities = require("../utils");
const { expenseValidation, validate } = require("../utils/validation.js");
const expensesController = require("../controllers/expenses");
const { isAuthenticated } = require("../utils/authenticate.js");

router.get("/", utilities.handleErrors(expensesController.getAll));

router.get("/:id", utilities.handleErrors(expensesController.getSingle));

router.post(
  "/",
  isAuthenticated,
  expenseValidation(),
  validate,
  utilities.handleErrors(expensesController.createExpense)
);

router.put(
  "/:id",
  isAuthenticated,
  expenseValidation(),
  validate,
  utilities.handleErrors(expensesController.updateExpense)
);

router.delete(
  "/:id",
  isAuthenticated,
  utilities.handleErrors(expensesController.deleteExpense)
);

module.exports = router;
