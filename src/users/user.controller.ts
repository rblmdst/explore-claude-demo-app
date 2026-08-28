import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { asyncHandler } from "../core/utils";
import { UserService } from "./user.service";

const toPublicUser = (user: {
  _id: unknown;
  email: string;
  firstName: string;
  lastName: string;
}) => {
  const { _id, email, firstName, lastName } = user;
  return { _id, email, firstName, lastName };
};

export function userControllerFactory(userService: UserService) {
  return {
    getCurrentUser: asyncHandler(
      async (req: Request, res: Response, next: NextFunction) => {
        const connectedUserId = (req as any).user._id;
        const user = await userService.getUser(connectedUserId);
        if (!user) {
          res.status(404);
          return res.end();
        }
        return res.json(toPublicUser(user));
      }
    ),
    getUserById: asyncHandler(
      async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        if (!isValidObjectId(userId)) {
          res.status(404);
          return res.end();
        }
        const user = await userService.getUser(userId);
        if (!user) {
          res.status(404);
          return res.end();
        }
        return res.json(toPublicUser(user));
      }
    ),
  };
}
