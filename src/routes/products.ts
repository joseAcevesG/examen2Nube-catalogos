import { Router } from "express";
import ProductController from "../controllers/products.controllers";

const router = Router();

router.get("/", ProductController.getAll);

router.get("/:id", ProductController.get);

router.post("/", ProductController.create);

router.put("/:id", ProductController.update);

router.delete("/:id", ProductController.delete);

export default router;
