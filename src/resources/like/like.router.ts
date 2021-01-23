import { Router } from "express";
import { createOne, removeOne } from "./like.controllers";

const router = Router();

// /like/
// router.route("/").post(createOne)
//   .get(controllers.getMany)

// /like/:id
router.route("/:id").post(createOne).delete(removeOne);
//   .put(controllers.updateOne);

export default router;
