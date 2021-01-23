import { Router } from "express";
import { createOne, getMany, getOne, updateOne } from "./user.controllers";

const router = Router();

// /user/
router.route("/").get(getMany).post(createOne);

// // /user/:id
router.route("/:id").get(getOne).put(updateOne);
// //   .delete(controllers.removeOne);

export default router;
