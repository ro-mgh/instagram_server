import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createOne = async (req: Request, res: Response) => {
  try {
    console.log(req);
    const result = await prisma.comments.create({
      data: {
        ...req.body,
      },
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

export const getMany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comments = await prisma.comments.findMany({
      where: {
        postId: +id,
      },
      select: {
        user: {
          select: {
            username: true,
          },
        },
        comment: true,
      },
    });
    res.status(200).json(comments);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
