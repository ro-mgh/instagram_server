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
    if ((<any>req).user) {
      const userId = (<any>req).user; // id of user
      const user = await prisma.user.findUnique({
        where: {
          id: userId + "",
        },
        select: { followingIds: true },
      });
      if (user) {
        const followingArr = user.followingIds.map(
          (user: { followingId: string }) => {
            return user.followingId;
          }
        );

        const coursorFromClient = req.params.id; //page

        // if previous coursor comes from client => show the next data othervise default n items
        if (!+coursorFromClient) {
          const explorePosts = await prisma.post.findMany({
            take: 9,
            where: {
              authorId: {
                notIn: [...followingArr, userId],
              },
            },
            select: {
              id: true,
              image: true,
              createdAt: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          });

          // if there are no post futher => do not send coursor
          if (explorePosts.length === 9) {
            const lastPostInResults = explorePosts[8]; // Remember: zero-based index! :)
            const myCursor = lastPostInResults.id; //

            res.status(200).json({ data: explorePosts, nextCursor: myCursor });
          } else {
            res.status(200).json({
              data: explorePosts,
            });
          }
        } else {
          const explorePosts = await prisma.post.findMany({
            take: 9,
            skip: 1,
            cursor: {
              id: +coursorFromClient,
            },
            where: {
              authorId: {
                notIn: [...followingArr, userId],
              },
            },
            select: {
              id: true,
              image: true,
              createdAt: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          });
          if (explorePosts.length === 9) {
            const lastPostInResults = explorePosts[8]; // Remember: zero-based index! :)
            const myCursor = lastPostInResults.id; //

            res.status(200).json({ data: explorePosts, nextCursor: myCursor });
          } else {
            res.status(200).json({
              data: explorePosts,
            });
          }
        }
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

export const getManyFromFollowing = async (req: Request, res: Response) => {
  try {
    if ((<any>req).user) {
      const userId = (<any>req).user; // id of user
      const user = await prisma.user.findUnique({
        where: {
          id: userId + "",
        },
        select: { followingIds: true },
      });
      if (user) {
        // user => following => postsIds[]
        // where with multiple fields

        const followingArr = user.followingIds.map(
          (user: { followingId: string }) => {
            return user.followingId;
          }
        );

        const coursorFromClient = req.params.id; //page
        // if previous coursor comes from client => show the next data othervise default n items
        if (!+coursorFromClient) {
          const followingPosts = await prisma.post.findMany({
            take: 4,
            where: {
              authorId: {
                in: [...followingArr, userId],
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
                      id: true,
                    },
                  },
                  comment: true,
                  id: true,
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
                  avatar: true,
                },
              },
              createdAt: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          });
          // if there are no post futher => do not send coursor
          if (followingPosts.length === 4) {
            const lastPostInResults = followingPosts[3]; // Remember: zero-based index! :)
            const myCursor = lastPostInResults.id; //

            res
              .status(200)
              .json({ data: followingPosts, nextCursor: myCursor });
          } else {
            res.status(200).json({
              data: followingPosts,
            });
          }
        } else {
          const followingPosts = await prisma.post.findMany({
            take: 4,
            skip: 1,
            cursor: {
              id: +coursorFromClient,
            },
            where: {
              authorId: {
                in: [...followingArr, userId],
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
                      id: true,
                    },
                  },
                  comment: true,
                  id: true,
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
                  avatar: true,
                },
              },
              createdAt: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          });
          // if there are no post futher => do not send coursor
          if (followingPosts.length === 4) {
            const lastPostInResults = followingPosts[3]; // Remember: zero-based index! :)
            const myCursor = lastPostInResults.id; //

            res
              .status(200)
              .json({ data: followingPosts, nextCursor: myCursor });
          } else {
            res.status(200).json({
              data: followingPosts,
            });
          }
        }
      } else {
        res.status(400).json([]);
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
      select: {
        id: true,
        text: true,
        image: true,

        comments: {
          select: {
            user: {
              select: {
                username: true,
                id: true,
              },
            },
            comment: true,
            id: true,
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
            avatar: true,
          },
        },
        createdAt: true,
      },
    });
    res.status(200).json(post);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
