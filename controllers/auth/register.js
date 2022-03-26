const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../models");

const register = async (req, res) => {
  const { login, password, skype, name, performers } = req.body;
  const user = await User.findOne({ login });

  if (user) {
    throw new Conflict("login in use");
  }
  const avatarURL = gravatar.url(login);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = await User.create({
    login,
    password: hashPassword,
    avatarURL,
    skype,
    name,
    performers,
  });

  newUser.save();

  res.status(200).json({
    status: "success",
    code: 200,
    message: "register success",
  });
};

module.exports = register;
