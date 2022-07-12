import { Router } from "express";
import {
  index,
  show,
  login,
  register,
} from "../../controllers/usersController";
import authUser from "../../middleware/authUser";

const userRouter = Router();

userRouter.get("/", authUser, index);
userRouter.get("/:id", authUser, show);
userRouter.post("/login", login);
userRouter.post("/register", register);

export default userRouter;
