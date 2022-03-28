const { Superhero } = require("../../models");

const getAll = async (req, res) => {
  const page = req.params ? req.params : 1;
  const skipIndex = (page.page - 1) * 5;
  console.log(skipIndex);
  const data = await Superhero.find().limit(5).skip(skipIndex);

  res.json({
    status: "success",
    code: 200,
    data,
  });
};

module.exports = getAll;
