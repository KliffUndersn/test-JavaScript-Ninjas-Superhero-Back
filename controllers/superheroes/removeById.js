const { NotFound } = require("http-errors");

const { Superhero } = require("../../models");

const removeById = async (req, res) => {
  const { id } = req.params;
  console.log(req.params)
  const data = await Superhero.findByIdAndRemove(id);

  if (!data) {
    throw new NotFound(`Superhero with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: `Superhero with id=${id} deleted`,
  });
};

module.exports = removeById;
