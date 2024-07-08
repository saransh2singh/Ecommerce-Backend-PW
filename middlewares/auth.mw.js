const user_model = require("../models/user.model");

// Create a mw which will check if the request body is proper and correct

const verifySignUpBody = async (req, res, next) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({
        message: "Failed! Name was not provided in request body",
      });
    }
    if (!req.body.email) {
      return res.status(400).send({
        message: "Failed! Email was not provided in request body",
      });
    }
    if (!req.body.userId) {
      return res.status(400).send({
        message: "Failed! userId was not provided in request body",
      });
    }
    // Check if the user with the same userId is already present
    const user = await user_model.findOne({ userId: req.body.userId });
    if (user) {
      return res.status(400).send({
        message: "Failed! user with same userId is already present",
      });
    }
    next();
  } catch (err) {
    console.log("Error while validating the request object", err);
    res.status(500).send({
      message: "Error while validating the request",
    });
  }
};

const verifySignInBody = async (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).send({
      message: "userId is not provided",
    });
  }
  if (!req.body.password) {
    return res.status(400).send({
      message: "Password is not provided",
    });
  }
  next();
};

module.exports = {
  verifySignUpBody: verifySignUpBody,
  verifySignInBody: verifySignInBody,
};
