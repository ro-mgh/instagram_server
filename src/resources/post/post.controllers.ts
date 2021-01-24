import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createOne = async (req: Request, res: Response) => {
  try {
    console.log(req);
    const result = await prisma.post.create({
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
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

export const getManyFromFollowing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
      select: { followingIds: true },
    });
    if (user) {
      // user => following => postsIds[]
      // where with multiple fields

      const followingArr = user.followingIds.map(({ followingId }) => {
        return +followingId;
      });
      console.log(followingArr);
      const followingPosts = await prisma.post.findMany({
        where: {
          authorId: {
            in: followingArr,
          },
        },
        select: {
          id: true,
          text: true,
          image: true,
          // comments: {
          //   select: {
          //     user: {
          //       select: {
          //         username: true,
          //       },
          //     },
          //     comment: true,
          //   },
          // },
          likes: {
            select: {
              userId: true,
            },
          },
          author: {
            select: {
              username: true,
              id: true,
            },
          },
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json(followingPosts);
    } else {
      res.status(400).json({ error: "error" });
    }
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(post);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
