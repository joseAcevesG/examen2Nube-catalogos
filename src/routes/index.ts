// cspell: disable
import { Router } from "express";
import clientRouter from "./clients";
import domicileRouter from "./domiciles";
import productRouter from "./products";
import salesRouter from "./sales";
const router = Router();

router.get("/", (req, res) => {
	res.send("API is working");
});
router.use("/clients", clientRouter);
router.use("/domiciles", domicileRouter);
router.use("/products", productRouter);
router.use("/sales", salesRouter);

export default router;
