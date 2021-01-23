import { Router } from "express";
import { createOne, getMany, getOne } from "./post.controllers";

const router = Router();

// /post/
router.route("/").get(getMany).post(createOne);

// /post/:id
router.route("/:id").get(getOne);
//   .put(controllers.updateOne);
//   .delete(controllers.removeOne);

export default router;
