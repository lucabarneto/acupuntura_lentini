import { Router } from "express";
import { IUser } from "../types/mongo/IUser.ts";
import { UserController } from "../controllers/users.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { RequestParams } from "../types/express/RequestParams.ts";
import { authenticate } from "../middlewares/authenticate.ts";
import { adminAuthorization } from "../middlewares/adminAuthorization.ts";

const userController = new UserController();

export const userRouter = Router();

userRouter.param("id", userController.handleId);

userRouter.get(
  "/",
  authenticate("jwt", { session: false }),
  adminAuthorization,
  userController.getAllUsers
);

userRouter.get(
  "/:id",
  authenticate("jwt", { session: false }),
  adminAuthorization,
  validateRequest({ params: RequestParams }),
  userController.getUserById
);

userRouter.post(
  "/",
  authenticate("jwt", { session: false }),
  adminAuthorization,
  validateRequest({ body: IUser }),
  userController.createUser
);

userRouter.put(
  "/:id",
  authenticate("jwt", { session: false }),
  adminAuthorization,
  validateRequest({ params: RequestParams, body: IUser }),
  userController.updateUser
);

userRouter.delete(
  "/:id",
  authenticate("jwt", { session: false }),
  adminAuthorization,
  validateRequest({ params: RequestParams }),
  userController.deleteUser
);
