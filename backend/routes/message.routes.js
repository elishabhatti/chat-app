import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getUserForSideBar } from "../controllers/message.controller.js";

const route = Router();

route.get("/user", protectRoute, getUserForSideBar);

export default route;
