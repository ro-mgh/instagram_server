import { Router } from "express";
import { createOne, getMany } from "./comment.controllers";

const router = Router();

// /comment/
router
  .route("/")
  // .get(getMany)
  .post(createOne);

// /comment/:id
router.route("/:id").get(getMany);
//   .put(controllers.updateOne);
//   .delete(controllers.removeOne);

export default router;
