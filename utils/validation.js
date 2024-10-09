const { body, validationResult } = require("express-validator");

const expenseValidation = () => {
  return [
    body("date").isString().notEmpty().withMessage("Add a date"),
    body("account").isString().notEmpty().withMessage("Add an account"),
    body("amount").isNumeric().notEmpty().withMessage("Add Valid Amount"),
    body("category").isString().notEmpty().withMessage("Add valid Category"),
    body("method").isString().notEmpty().withMessage("Add valid Method"),
    body("payee").isString().notEmpty().withMessage("Add valid Payee"),
    body("purpose").isString().notEmpty().withMessage("Add valid Purpose"),
  ];
};

const incomeValidation = () => {
  return [
    body("date").isString().notEmpty().withMessage("Add a date"),
    body("account").isString().notEmpty().withMessage("Add an account"),
    body("amount").isNumeric().notEmpty().withMessage("Add an amount"),
    body("source").isString().notEmpty().withMessage("Add a source"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  expenseValidation,
  incomeValidation,
  validate,
};
