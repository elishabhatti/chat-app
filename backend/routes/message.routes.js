import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getUserForSideBar, getMessages } from "../controllers/message.controller.js";

const route = Router();

route.get("/user", protectRoute, getUserForSideBar);
route.get("/:id", protectRoute, getMessages);

export default route;
