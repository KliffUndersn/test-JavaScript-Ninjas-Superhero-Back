const { Unauthorized, NotFound, Forbidden } = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Unauthorized();
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (user.token !== token) {
      throw new Unauthorized();
    }
    if (!user) {
      throw new NotFound();
    }
    if (!user.access) {
      //изменить модель посли проведения тестов
      throw new Forbidden();
    }
    req.user = user;
    next();
  } catch (error) {
    next(new Unauthorized(error.message));
  }
};

module.exports = authenticate;
