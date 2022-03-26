const { Unauthorized } = require("http-errors");

const { User } = require("../../models");

const logout = async (req, res) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  const user = await User.findOne({ token });

  if (!user) {
    throw new Unauthorized();
  }
  await User.findByIdAndUpdate(user._id, { token: null });
  res.status(204).json({
    status: "success",
    code: 204,
  });
};

module.exports = logout;
