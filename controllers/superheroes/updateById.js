const { NotFound } = require("http-errors");

const { Superhero } = require("../../models");

const updateById = async (req, res) => {
  const { id } = req.params;
  const data = await Superhero.findByIdAndUpdate(id, req.body, { new: true });
  if (!data) {
    throw new NotFound(`Superhero with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data,
  });
};

module.exports = updateById;
