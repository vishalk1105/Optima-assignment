const express = require("express");
const {
  createProfile,
  getAllProfileById,
  updateProfileByID,
} = require("../controller/profileController.js");
const upload = require("../middleware/postUploadMiddleware.js");
const bodyParser = require("body-parser");
const { verifyToken } = require("../middleware/middleware.js");

const profileRouter = express.Router();
profileRouter.use(bodyParser.urlencoded({ extended: true }));
profileRouter.use(bodyParser.json());

profileRouter.get("/:userId", verifyToken, getAllProfileById);
profileRouter.post(
  "/create-profile",
  verifyToken,
  upload.single("image"),
  createProfile
);

profileRouter.put(
  "/update/:userId",
  verifyToken,
  upload.single("image"),
  updateProfileByID
);

module.exports = profileRouter;
