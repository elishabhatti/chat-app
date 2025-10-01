import { Router } from "express";
import { login, logout, signUp } from "../controllers/auth.controller.js";

const route = Router();

route.post("/signup", signUp);
route.post("/login", login);
route.post("/logout", logout);

export default route;
