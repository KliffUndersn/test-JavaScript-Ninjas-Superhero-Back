const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login }).populate("superheros");
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });

  await User.findByIdAndUpdate(user._id, { token: token }, { new: true });

  res.json({
    status: "success",
    code: 200,
    data: {
      _id: user._id,
      token,
      login,
      name: user.name,
    },
  });
};

module.exports = login;
