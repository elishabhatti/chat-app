import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getUserForSideBar, getMessages, sendMessage } from "../controllers/message.controller.js";

const route = Router();

route.get("/user", protectRoute, getUserForSideBar);
route.get("/:id", protectRoute, getMessages);
route.post("/send/:id", protectRoute, sendMessage);

export default route;
