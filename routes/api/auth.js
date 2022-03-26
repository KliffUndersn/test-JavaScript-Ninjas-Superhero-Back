const express = require("express");
const { validation, ctrlWrapper, authenticate } = require("../../middlewares");
const { joiSchema } = require("../../models/user");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/register", validation(joiSchema), ctrlWrapper(ctrl.register));

router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

// router.patch("/avatars", authenticate, upload.single("avatarURL"), ctrlWrapper(ctrl.updateAvatar));

router.patch("/user/fields/:id", authenticate, ctrlWrapper(ctrl.updateUser));

router.patch("/user/:id", authenticate, ctrlWrapper(ctrl.updateUserFields)); // админка

module.exports = router;
