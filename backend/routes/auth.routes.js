import { Router } from "express";
import {
  checkAuth,
  login,
  logout,
  signUp,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const route = Router();

route.post("/signup", signUp);
route.post("/login", login);
route.post("/logout", logout);
route.put("/update-profile", protectRoute, updateProfile);
route.get("/check", protectRoute, checkAuth);

export default route;
