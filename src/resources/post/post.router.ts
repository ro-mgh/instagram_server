import { Router } from "express";
import {
  createOne,
  getMany,
  getOne,
  getManyFromFollowing,
} from "./post.controllers";

const router = Router();

// /post/
router.route("/").get(getMany).post(createOne);

// /post/user/:id
router.route("/user/:id").get(getManyFromFollowing);

// /post/:id
router.route("/:id").get(getOne);
//   .put(controllers.updateOne);
//   .delete(controllers.removeOne);

export default router;
