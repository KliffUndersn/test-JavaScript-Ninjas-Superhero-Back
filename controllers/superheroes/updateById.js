const { NotFound } = require("http-errors");

const { Superhero } = require("../../models");

const updateById = async (req, res) => {
  const { _id, nickname, real_name,origin_description, superpowers, catch_phrase, images } = req.body;
  const newData = { nickname, real_name,origin_description, superpowers, catch_phrase, images }
  const data = await Superhero.findByIdAndUpdate(_id, newData, { new: true });
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
