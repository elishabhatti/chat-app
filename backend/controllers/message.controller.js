import { userModel } from "../models/user.models.js";

export const getUserForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await userModel
      .find({
        _id: { $ne: loggedInUserId },
      })
      .select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error(`Error from get user for side bar controller: ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
