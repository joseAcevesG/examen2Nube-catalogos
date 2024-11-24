import axios from "axios";
// cspell: disable
import { Request, Response } from "express";

const ip = process.env.IP;

class SalesController {
	get(req: Request, res: Response) {
		axios
			.get(`http://localhost:${process.env.SALES_PORT}/sales/${req.params.id}`)
			.then((response) => {
				res.status(response.status).send(response.data);
			})
			.catch((error) => {
				if (!error.response) {
					console.error(error);
					res.status(500).send("Internal Server Error");
					return;
				}
				res.status(error.response.status).send(error.response.data);
			});
	}

	create(req: Request, res: Response) {
		console.log("Creating sale");
		console.log(req.body);
		console.log(req.headers);
		console.log(req.method);
		console.log(`http://localhost:${process.env.SALES_PORT}/sales`);
		axios
			.post(`http://localhost:${process.env.SALES_PORT}/sales`, req.body)

			.then((response) => {
				console.log("Sale created");
				res.status(response.status).send(response.data);
			})
			.catch((error) => {
				if (!error.response) {
					console.error(error);
					res.status(500).send("Internal Server Error");
					return;
				}
				res.status(error.response.status).send(error.response.data);
			});
	}

	getPDF(req: Request, res: Response) {
		axios
			.get(
				`http://localhost:${process.env.SALES_PORT}/sales/${req.params.id}/pdf`,
			)
			.then((response) => {
				res.status(response.status).send(response.data);
			})
			.catch((error) => {
				if (!error.response) {
					console.error(error);
					res.status(500).send("Internal Server Error");
					return;
				}
				res.status(error.response.status).send(error.response.data);
			});
	}
}

export default new SalesController();
