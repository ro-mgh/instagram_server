import { Request, Response, NextFunction } from "express";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createOne = async (req: Request, res: Response) => {
  try {
    const result = await prisma.user.create({
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
    if ((<any>req).user) {
      const users = await prisma.user.findMany({
        include: {
          followingIds: true,
          Following: true,
          posts: {
            orderBy: {
              id: "desc",
            },
          },
        },
      });
      res.status(200).json(users);
    } else {
      res.status(400).json({ error: "Auth error" });
    }
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    // console.log(req)
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        followingIds: true,
        Following: true,
        posts: true,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

export const updateOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { ...req.body },
    });
    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
