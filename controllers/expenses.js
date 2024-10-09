const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Expenses']
  const result = await mongodb.getDatabase().db().collection("expenses").find();
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Expenses']
  const expenseId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("expenses")
    .find({ _id: expenseId });
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  });
};

const createExpense = async (req, res) => {
  //#swagger.tags=['Expenses']
  const expense = {
    date: req.body.date,
    account: req.body.account,
    amount: req.body.amount,
    category: req.body.category,
    method: req.body.method,
    payee: req.body.payee,
    purpose: req.body.purpose,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("expenses")
    .insertOne(expense);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Error while creating the expense");
  }
};

const updateExpense = async (req, res) => {
  //#swagger.tags=['Users']
  const expenseId = new ObjectId(req.params.id);
  const expense = {
    date: req.body.date,
    account: req.body.account,
    amount: req.body.amount,
    category: req.body.category,
    method: req.body.method,
    payee: req.body.payee,
    purpose: req.body.purpose,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("expenses")
    .replaceOne({ _id: expenseId }, expense);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Error while updating the expense");
  }
};

const deleteExpense = async (req, res) => {
  const expenseId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("expenses")
    .deleteOne({ _id: expenseId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Error while deleting the user");
  }
};

module.exports = {
  getAll,
  getSingle,
  createExpense,
  updateExpense,
  deleteExpense,
};
