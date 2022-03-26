const { Conflict } = require("http-errors");
const { Superhero } = require("../../models");

const add = async (req, res) => {
  const hero = req.body;
  console.log(hero);
  const isUnique = await Superhero.find({nickname: hero.nickname});
  if (isUnique.length > 0) {
    throw new Conflict(`${hero.nickname} уже есть в базе`);
  }
  const data = await Superhero.create(hero);
  res.status(201).json({
    status: "success",
    code: 201,
    data,
  });
};

module.exports = add;
