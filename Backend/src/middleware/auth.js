import jwt from "jsonwebtoken";

export const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Authentication failed, token missing",
      });
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET,
      { ignoreExpiration: true },
      (err, result) => {
        if (err) {
          return res.status(401).send({
            success: false,
            message: "Authentication failed, invalid token",
            error: err.message,
          });
        } else if (result.expiry < Date.now() / 1000) {
          return res.status(401).send({
            success: false,
            message: "Authentication failed, token expired",
          });
        } else return result;
      }
    );
    req.userId = decodedToken.userId;
    req.isAdmin = decodedToken.isAdmin;
    next();
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const roleAuthorization = (req, res, next) => {
  try {
    if (!req.isAdmin)
      return res.status(403).send({
        success: false,
        message: "Access denied, admin privileges required",
      });
    else next();
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};
