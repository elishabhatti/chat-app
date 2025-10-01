import { Router } from "express";
import { login, logout, signUp, updateProfile } from "../controllers/auth.controller.js";

const route = Router();

route.post("/signup", signUp);
route.post("/login", login);
route.post("/logout", logout);
route.put("/update-profile", updateProfile);

export default route;
