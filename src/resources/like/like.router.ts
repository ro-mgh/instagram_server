import { Router } from "express";
import { createOne, removeOne } from "./like.controllers";

const router = Router();

// /like/:id
router.route("/:id").post(createOne).delete(removeOne);

export default router;
