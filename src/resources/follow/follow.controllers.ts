import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createOne = async (req: Request, res: Response) => {
  try {
    if ((<any>req).user) {
      const userId = (<any>req).user;
      const { id } = req.params;
      const result = await prisma.following.create({
        data: {
          userId: userId,
          followingId: id + "",
        },
      });
      res.status(200).end();
    } else {
      res.status(400).json({ error: "Auth error" });
    }
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

export const removeOne = async (req: Request, res: Response) => {
  try {
    if ((<any>req).user) {
      const userId = (<any>req).user;
      const { id } = req.params;
      const result = await prisma.following.delete({
        where: {
          userId_followingId: {
            userId: userId,
            followingId: id + "",
          },
        },
      });
      res.status(200).json(result);
    } else {
      res.status(400).json({ error: "Auth error" });
    }
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
