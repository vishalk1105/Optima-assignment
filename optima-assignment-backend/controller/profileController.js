const Profile = require("../models/profileModels.js");

const getAllProfileById = async (req, res) => {
  try {
    const { userId } = req.params;
    const profileById = await Profile.find({ userId: userId });

    if (profileById) {
      res.status(200).send({
        status: true,
        statusCode: 200,
        msg: "success",
        data: profileById,
      });
    } else {
      res.status(400).send({
        status: false,
        statusCode: 400,
        msg: "No data found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      msg: error.message,
    });
  }
};

const createProfile = async (req, res) => {
  try {
    let profile;
    const { userId, userName, dob, occupation, description } = req.body;
    console.log(req.body, "create profile");
    const dobDate = new Date(dob);
    if (!req.file) {
      res.status(400).send({ status: false, msg: "Add Images" });
    } else {
      profile = new Profile({
        userId: userId,
        userName: userName,
        dob: dobDate,
        occupation: occupation,
        description: description,
        image: `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`,
      });
      const profile_data = await profile.save();
      res.status(200).send({ data: profile_data });
    }
  } catch (err) {
    res.status(400).send({ status: false, msg: "Something went wrong" });
    console.log(err);
  }
};

const updateProfileByID = async (req, res) => {
  try {
    const { userId } = req.params;
    const { userName, dob, occupation, description } = req.body;

    const updates = { userName, dob, occupation, description };

    if (req.file) {
      const image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
      updates.image = image;
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: userId },
      {
        $set: updates,
      },
      {
        new: true,
      }
    );
    if (updatedProfile) {
      res.status(200).send({
        status: true,
        msg: "Post updated successfully",
        data: updatedProfile,
      });
    } else {
      res.status(404).send({ status: false, msg: "Post not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createProfile,
  getAllProfileById,
  updateProfileByID,
};
