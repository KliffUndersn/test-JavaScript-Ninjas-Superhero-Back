const express = require("express");
const { ctrlWrapper, validation } = require("../../middlewares");
const { joiSchema } = require("../../models/superhero");
const { superheroes: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:page", ctrlWrapper(ctrl.getAll));

router.get("/hero/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.add)); // auth validation add

router.patch("/hero/:id", validation(joiSchema), ctrlWrapper(ctrl.updateById)); // auth validation add

router.delete("/hero/:id", ctrlWrapper(ctrl.removeById)); // auth validation add

module.exports = router;
