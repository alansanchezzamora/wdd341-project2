const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Expenses']
  const result = await mongodb.getDatabase().db().collection("income").find();
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Expenses']
  const incomeId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("income")
    .find({ _id: incomeId });
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  });
};

const createIncome = async (req, res) => {
  //#swagger.tags=['Income']
  const income = {
    date: req.body.date,
    account: req.body.account,
    amount: req.body.amount,
    source: req.body.source,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("income")
    .insertOne(income);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Error while creating the income entry");
  }
};

const updateIncome = async (req, res) => {
  //#swagger.tags=['Income']
  const incomeId = new ObjectId(req.params.id);
  const income = {
    date: req.body.date,
    account: req.body.account,
    amount: req.body.amount,
    source: req.body.source,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("income")
    .replaceOne({ _id: incomeId }, income);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Error while updating the income entry");
  }
};

const deleteIncome = async (req, res) => {
  const incomeId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("income")
    .deleteOne({ _id: incomeId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Error while deleting the income entry");
  }
};

module.exports = {
  getAll,
  getSingle,
  createIncome,
  updateIncome,
  deleteIncome,
};
