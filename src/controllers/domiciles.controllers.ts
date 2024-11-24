// cspell: disable
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import domicile from "../models/domicile";
import { Domicile } from "../types";
import AddressType from "../types/addressType";

class DomicileController {
	getAll(req: Request, res: Response) {
		domicile
			.getAll()
			.then((domiciles) => {
				res.json(domiciles);
			})
			.catch(() => {
				res.status(500).send("Error al procesar la solicitud");
			});
	}

	get(req: Request, res: Response) {
		const { id } = req.params;
		domicile
			.get(id)
			.then((domicile) => {
				res.json(domicile);
			})
			.catch((error) => {
				if (error.message === "Domicilio no encontrado") {
					res.status(404).send(error.message);
					return;
				}
				res.status(500).send("Error al procesar la solicitud");
			});
	}

	create(req: Request, res: Response) {
		if (!Object.values(AddressType).includes(req.body.addressType)) {
			throw new Error(`Invalid address type: ${req.body.addressType}`);
		}
		const data: Domicile = {
			id: uuidv4(),
			address: req.body.address,
			colony: req.body.colony,
			municipality: req.body.municipality,
			state: req.body.state,
			addressType: req.body.addressType as AddressType,
		};

		domicile
			.create(data)
			.then((domicile) => {
				res.status(201).send(`Domicilio creado con ID: ${domicile.id}`);
			})
			.catch((error) => {
				if (error.message.includes("Invalid address type")) {
					res.status(400).send("Tipo de dirección inválido");
					return;
				}
				res.status(500).send("Error al procesar la solicitud");
			});
	}

	update(req: Request, res: Response) {
		const { id } = req.params;
		const data: Domicile = {
			id,
			address: req.body.address,
			colony: req.body.colony,
			municipality: req.body.municipality,
			state: req.body.state,
			addressType:
				AddressType[req.body.addressType as keyof typeof AddressType],
		};

		domicile
			.update(data)
			.then((domicile) => {
				res.send(`Domicilio actualizado con ID: ${domicile.id}`);
			})
			.catch((error) => {
				if (error.message === "Domicilio no encontrado") {
					res.status(404).send(error.message);
					return;
				}
				res.status(500).send("Error al procesar la solicitud");
			});
	}

	delete(req: Request, res: Response) {
		const { id } = req.params;

		domicile
			.delete(id)
			.then(() => {
				res.send(`Domicilio eliminado con ID: ${id}`);
			})
			.catch(() => {
				res.status(500).send("Error al procesar la solicitud");
			});
	}
}

export default new DomicileController();
