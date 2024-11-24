// cspell: disable
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import client from "../models/client";
import { Client } from "../types";

class ClientController {
	getAll(req: Request, res: Response) {
		client
			.getAll()
			.then((clients) => {
				res.json(clients);
			})
			.catch(() => {
				res.status(500).send("Error al procesar la solicitud");
			});
	}

	get(req: Request, res: Response) {
		const { id } = req.params;
		client
			.get(id)
			.then((client) => {
				res.json(client);
			})
			.catch((error) => {
				console.log(error.message);
				if (error.message === "Cliente no encontrado") {
					res.status(404).send(error.message);
					return;
				}
				res.status(500).send("Error al procesar la solicitud");
			});
	}

	create(req: Request, res: Response) {
		const data: Client = {
			id: uuidv4(),
			socialReason: req.body.socialReason,
			companyName: req.body.companyName,
			email: req.body.email,
		};

		client
			.create(data)
			.then((client) => {
				res.status(201).send(`Cliente creado con ID: ${client.id}`);
			})
			.catch(() => {
				res.status(500).send("Error al procesar la solicitud");
			});
	}

	update(req: Request, res: Response) {
		const { id } = req.params;
		const data: Client = {
			id,
			socialReason: req.body.socialReason,
			companyName: req.body.companyName,
			email: req.body.email,
		};

		client
			.update(data)
			.then((client) => {
				res.send(`Cliente actualizado con ID: ${client.id}`);
			})
			.catch((error) => {
				if (error.message === "Cliente no encontrado") {
					res.status(404).send(error.message);
					return;
				}
				res.status(500).send("Error al procesar la solicitud");
			});
	}

	delete(req: Request, res: Response) {
		const { id } = req.params;
		client
			.delete(id)
			.then(() => {
				res.send(`Cliente eliminado con ID: ${id}`);
			})
			.catch(() => {
				res.status(500).send("Error al procesar la solicitud");
			});
	}
}

export default new ClientController();
