const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(401).json("You don't have access my friend");
  }
  next();
};

module.exports = {
  isAuthenticated,
};
