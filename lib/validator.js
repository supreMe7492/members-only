const { body, validationResult } = require("express-validator");

function handleValidationError(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

const signupValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Email field is empty")
    .isEmail()
    .withMessage("must be an email"),
  body("firstname").trim().notEmpty().withMessage("firstname field is empty"),
  body("lastname").trim().notEmpty().withMessage("lastname field is empty"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("password should be atleast of 5 characters"),
  body("confirm")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("password doesnt match up"),
];

const loginValidator = [body("username").trim()];

const postValidator = [body("postText").trim];
module.exports = {
  handleValidationError,
  signupValidator,
  loginValidator,
  postValidator,
};
