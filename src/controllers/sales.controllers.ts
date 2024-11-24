import axios from "axios";
// cspell: disable
import { Request, Response } from "express";

const ip = process.env.IP;

class SalesController {
	get(req: Request, res: Response) {
		axios
			.get(`http://${process.env.SALES_ENDPOINT}/sales/${req.params.id}`)
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
		axios
			.post(`http://${process.env.SALES_ENDPOINT}/sales`, req.body)

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

	getPDF(req: Request, res: Response) {
		axios
			.get(`http://${process.env.SALES_ENDPOINT}/sales/${req.params.id}/pdf`)
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
