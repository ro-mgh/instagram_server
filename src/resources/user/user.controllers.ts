import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createOne = async (req: Request, res: Response) => {
  try {
    console.log(req);
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
    const users = await prisma.user.findMany();
    res.status(200).json(users);
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
        id: Number(id),
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
      where: { id: Number(id) },
      data: { ...req.body },
    });
    res.status(200).json(updatedUser);
  } catch (e) {
    console.log(req.params, req.body);
    res.status(400).json({ error: e });
  }
};
