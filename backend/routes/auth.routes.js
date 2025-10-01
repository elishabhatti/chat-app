import { Router } from "express";
import { login, logout, signUp } from "../controllers/auth.controller.js";

const route = Router();

route.post("/signup", signUp);
route.get("/login", login);
route.get("/logout", logout);

export default route;
