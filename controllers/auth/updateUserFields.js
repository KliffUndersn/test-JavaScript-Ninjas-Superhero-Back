const { NotFound } = require("http-errors");

const { User } = require("../../models");

const updateUserFields = async (req, res) => {
  const { id } = req.params;

  const data = await User.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!data) {
    throw new NotFound(`User with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data,
  });
};

module.exports = updateUserFields;
