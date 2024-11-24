import { Router } from "express";
import ClientController from "../controllers/clients.controllers";

const router = Router();

router.get("/", ClientController.getAll);

router.get("/:id", ClientController.get);

router.post("/", ClientController.create);

router.put("/:id", ClientController.update);

router.delete("/:id", ClientController.delete);

export default router;
