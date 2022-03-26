const { Schema, model } = require("mongoose");
const Joi = require("joi");

const superheros = Schema(
  {
    nickname: {
      type: String,
      required: [true, "Nickname is required"],
    },
    real_name: {
      type: String,
      default: "Unknown",
    },
    origin_description: {
      type: String,
      default: "Classified",
    },
    superpowers: {
      type: String,
      default: "Classified",
    },
    catch_phrase: {
      type: String,
      default: "Unknown",
    },
    images: [
      {
        type: String,
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  nickname: Joi.string().required(),
  real_name: Joi.string(),
  origin_description: Joi.string(),
  superpowers: Joi.string(),
  catch_phrase: Joi.string(),
  images: Joi.array(),
});

const Superhero = model("superhero", superheros);

module.exports = {
  Superhero,
  joiSchema,
};
