import { Router } from "express";
import {
  createOne,
  getMany,
  getOne,
  getManyFromFollowing,
} from "./post.controllers";

const router = Router();

// /post/
router.route("/").post(createOne);

// /post/page/:id
router.route("/page/:id").get(getMany);

// /post/user/:id
router.route("/user/page/:id").get(getManyFromFollowing);

// /post/:id
router.route("/:id").get(getOne);
//   .put(controllers.updateOne);
//   .delete(controllers.removeOne);

export default router;
