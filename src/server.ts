import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
// import config from "./config";
import cors from "cors";

import { protect } from "./resources/auth";
import userRouter from "./resources/user/user.router";
import postRouter from "./resources/post/post.router";
import likeRouter from "./resources/like/like.router";
import followRouter from "./resources/follow/follow.router";
import commentRouter from "./resources/comment/comment.router";

export const app = express();

const PORT = 3000;

app.disable("x-powered-by");

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

// app.post("/signup", signup);
// app.post("/signin", signin);

app.use("/", protect);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/like", likeRouter);
app.use("/follow", followRouter);
app.use("/comment", commentRouter);

export const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`API on http://localhost:${PORT}/`);
    });
  } catch (e) {
    console.error(e);
  }
};
