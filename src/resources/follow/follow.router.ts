import { Router } from "express";
import { createOne, removeOne } from "./follow.controllers";

const router = Router();

// /follow/:id
router.route("/:id").post(createOne).delete(removeOne);

export default router;
