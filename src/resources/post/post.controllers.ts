import { Request, Response, NextFunction } from "express";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createOne = async (req: Request, res: Response) => {
  try {
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
    if ((<any>req).user) {
      const userId = (<any>req).user; // id of user

      //**** option 1 */
      // const posts = await prisma.following.findMany({
      //   where: {
      //     userId: +id,
      //   },
      //   select: {
      //     following: {
      //       select: {
      //         posts: {
      //           select: {
      //             id: true,
      //             text: true,
      //             image: true,
      //             // comments: {
      //             //   select: {
      //             //     user: {
      //             //       select: {
      //             //         username: true,
      //             //       },
      //             //     },
      //             //     comment: true,
      //             //   },
      //             // },
      //             // likes: {
      //             //   select: {
      //             //     userId: true,
      //             //   },
      //             // },
      //             // author: {
      //             //   select: {
      //             //     username: true,
      //             //     id: true,
      //             //   },
      //             // },
      //             createdAt: true,
      //           },
      //           orderBy: {
      //             createdAt: "desc",
      //           },
      //         },
      //       },
      //     },
      //   },
      // });

      // res.status(200).json(posts);

      //**** option2 */
      const user = await prisma.user.findUnique({
        where: {
          id: userId + "",
        },
        select: { followingIds: true },
      });
      if (user) {
        // user => following => postsIds[]
        // where with multiple fields

        const followingArr = user.followingIds.map(({ followingId }) => {
          return followingId;
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
            comments: {
              select: {
                user: {
                  select: {
                    username: true,
                  },
                },
                comment: true,
              },
            },
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
    } else {
      res.status(400).json({ error: "Auth error" });
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
