import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.following.create({
      data: {
        userId: req.body.userId,
        followingId: +id,
      },
    });
    res.status(200).end();
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

export const removeOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.following.delete({
      where: {
        userId_followingId: {
          userId: req.body.userId,
          followingId: +id,
        },
      },
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
