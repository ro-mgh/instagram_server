import { Router } from "express";
import { createOne, removeOne } from "./follow.controllers";

const router = Router();

// /follow/
// router.route("/").post(createOne)
//   .get(controllers.getMany)

// /follow/:id
router.route("/:id").post(createOne).delete(removeOne);
//   .put(controllers.updateOne);

export default router;
