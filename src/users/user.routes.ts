import { Router } from "express";
import { ConfigService } from "../core/services/configuration.service";
import { userControllerFactory } from "./user.controller";
import { userRepositoryFactory } from "./user.repository";
import { userServiceFactory } from "./user.service";

export const userRouterFactory = (configService: ConfigService) => {
  const userRouter = Router();

  // deps
  const userRepository = userRepositoryFactory();
  const userService = userServiceFactory(userRepository, configService);
  const userController = userControllerFactory(userService);

  userRouter.get("/me", userController.getCurrentUser);

  userRouter.get("/:userId", userController.getUserById);

  return userRouter;
};
