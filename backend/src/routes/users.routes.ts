import { Router } from "express";
import { IUser } from "../types/mongo/IUser.js";
import { UserController } from "../controllers/users.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { RequestParams } from "../types/express/RequestParams.js";
import { authenticate } from "../middlewares/authenticate.js";
import { adminCredentials } from "../middlewares/adminCredentials.js";

const userController = new UserController();

export const userRouter = Router();

userRouter.param("id", userController.handleId);

userRouter.get(
  "/",
  authenticate("jwt", { session: false }),
  adminCredentials,
  userController.getAllUsers
);

userRouter.get(
  "/:id",
  authenticate("jwt", { session: false }),
  adminCredentials,
  validateRequest({ params: RequestParams }),
  userController.getUserById
);

userRouter.post(
  "/",
  authenticate("jwt", { session: false }),
  adminCredentials,
  validateRequest({ body: IUser }),
  userController.createUser
);

userRouter.put(
  "/:id",
  authenticate("jwt", { session: false }),
  adminCredentials,
  validateRequest({ params: RequestParams, body: IUser }),
  userController.updateUser
);

userRouter.delete(
  "/:id",
  authenticate("jwt", { session: false }),
  adminCredentials,
  validateRequest({ params: RequestParams }),
  userController.deleteUser
);
