import { Router } from "express";
import { IUser } from "../types/mongo/IUser.ts";
import { UserController } from "../controllers/users.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { RequestParams } from "../types/express/RequestParams.ts";

export const userRouter = Router();
const userController = new UserController();

userRouter.param("id", userController.handleId);

userRouter.get("/", userController.getAllUsers);

userRouter.get(
  "/:id",
  validateRequest({ params: RequestParams }),
  userController.getUserById
);

userRouter.post(
  "/",
  validateRequest({ body: IUser }),
  userController.createUser
);

userRouter.put(
  "/:id",
  validateRequest({ params: RequestParams, body: IUser }),
  userController.updateUser
);

userRouter.delete(
  "/:id",
  validateRequest({ params: RequestParams }),
  userController.deleteUser
);
