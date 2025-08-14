import { validationResult } from "express-validator";

export const throwError = (req, res, next) => {
  const error = validationResult(req);

  if (error.array().length) {
    return res.status(400).send({
      success: false,
      message: error.array()[0].msg,
    });
  }
  next();
};
