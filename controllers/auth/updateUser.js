const { NotFound } = require("http-errors");

const { User } = require("../../models");

const updateUserFields = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const data = await User.findOneAndUpdate(
    { _id: id },
    { password: password },
    { new: true }
  );

  if (!data) {
    throw new NotFound(`User with id=${id} not found`);
  }
  res.json({
    status: "Пароль успешно изменен",
    code: 200,
    data,
  });
};

module.exports = updateUserFields;
