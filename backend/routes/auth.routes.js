import { Router } from "express";

const route = Router();
route.get("/signup", (req, res) => {
  res.send("route signup");
});
// route.get("/login")
// route.get("/logout")

export default route;
