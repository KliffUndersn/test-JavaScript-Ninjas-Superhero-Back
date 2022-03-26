const { Schema, model, SchemaTypes } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    login: {
      type: String,
      required: [true, "login is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatarURL: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    token: {
      type: String,
      default: null,
    },
    access: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      default: "",
    },
    favorites: [
      {
        type: SchemaTypes.ObjectId,
        ref: "superhero",
        default: "",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().min(6),
  avatarURL: Joi.string(),
  access: Joi.boolean(),
  name: Joi.string(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSchema,
};
