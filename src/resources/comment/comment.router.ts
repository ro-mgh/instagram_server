import { Router } from "express";
import { createOne } from "./comment.controllers";

const router = Router();

// /comment/
router
  .route("/")
  // .get(getMany)
  .post(createOne);

// /comment/:id
// router.route("/:id").get(getOne);
//   .put(controllers.updateOne);
//   .delete(controllers.removeOne);

export default router;
