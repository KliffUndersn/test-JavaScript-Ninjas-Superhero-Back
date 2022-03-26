const { NotFound } = require("http-errors");

const { Superhero } = require("../../models");

const getById = async (req, res) => {
  const { id } = req.params;
  const data = await Superhero.findById(id);
  if (!data) {
    throw new NotFound(`Superhero with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data,
  });
};

module.exports = getById;
