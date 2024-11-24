// cspell: disable
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import product from "../models/product";
import { Product } from "../types";

class ProductController {
	getAll(req: Request, res: Response) {
		product
			.getAll()
			.then((products) => {
				res.json(products);
			})
			.catch(() => {
				res.status(500).send("Error al procesar la solicitud");
			});
	}

	get(req: Request, res: Response) {
		const { id } = req.params;
		product
			.get(id)
			.then((product) => {
				res.json(product);
			})
			.catch((error) => {
				if (error.message === "Producto no encontrado") {
					res.status(404).send(error.message);
					return;
				}
				res.status(500).send("Error al procesar la solicitud");
			});
	}

	create(req: Request, res: Response) {
		const data: Product = {
			id: uuidv4(),
			name: req.body.name,
			measureUnit: req.body.measureUnit,
			basePrice: req.body.basePrice,
		};

		product
			.create(data)
			.then((product) => {
				res.status(201).send(`Producto creado con ID: ${product.id}`);
			})
			.catch(() => {
				res.status(500).send("Error al procesar la solicitud");
			});
	}

	update(req: Request, res: Response) {
		const { id } = req.params;
		const data: Product = {
			id,
			name: req.body.name,
			measureUnit: req.body.measureUnit,
			basePrice: req.body.basePrice,
		};

		product
			.update(data)
			.then((product) => {
				res.send(`Producto actualizado con ID: ${product.id}`);
			})
			.catch((error) => {
				if (error.message === "Producto no encontrado") {
					res.status(404).send(error.message);
					return;
				}
				res.status(500).send("Error al procesar la solicitud");
			});
	}

	delete(req: Request, res: Response) {
		const { id } = req.params;
		product
			.delete(id)
			.then((product) => {
				res.send(`Producto eliminado con ID: ${id}`);
			})
			.catch(() => {
				res.status(500).send("Error al procesar la solicitud");
			});
	}
}

export default new ProductController();
