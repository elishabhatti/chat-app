import { messageModel } from "../models/message.models.js";
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

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await messageModel.find({
      $or: [
        { senderId: myId, receivedId: userToChatId },
        { senderId: userToChatId, receivedId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error(`Error from get message controller: ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
