import cloudinary from "../lib/cloudinary.js";
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

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receivedId } = req.params;
    const senderId = req.user._id;
    let imageUrl;

    if (image) {
      const updateResponse = await cloudinary.uploader.upload(image);
      imageUrl = updateResponse.secure_url;
    }

    const newMessage = new messageModel({
      senderId,
      receivedId,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    // todo: realtime functionality foes here => socket.io
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(`Error from send message controller: ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
