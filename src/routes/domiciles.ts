import { Router } from "express";
import domicileControllers from "../controllers/domiciles.controllers";

const router = Router();

router.get("/", domicileControllers.getAll);

router.get("/:id", domicileControllers.get);

router.post("/", domicileControllers.create);

router.put("/:id", domicileControllers.update);

router.delete("/:id", domicileControllers.delete);

export default router;
