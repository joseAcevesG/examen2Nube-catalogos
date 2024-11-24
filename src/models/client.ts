// cspell: disable
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Client as ClientType } from "../types";
import pool from "../utils/mySQL";

class Client {
	create(client: ClientType): Promise<ClientType> {
		const sql =
			"INSERT INTO clients (id, social_reason, company_name, email) VALUES (?, ?, ?, ?)";

		return pool
			.query<ResultSetHeader>(sql, [
				client.id,
				client.socialReason,
				client.companyName,
				client.email,
			])
			.then(([result]) => {
				return { ...client };
			})
			.catch((error) => {
				console.error(`Error creando cliente: ${error.message}`);
				return Promise.reject(
					new Error(`Error creando cliente: ${error.message}`),
				);
			});
	}

	update(client: ClientType): Promise<ClientType> {
		const sql =
			"UPDATE clients SET social_reason = ?, company_name = ?, email = ? WHERE id = ?";

		return pool
			.query<ResultSetHeader>(sql, [
				client.socialReason,
				client.companyName,
				client.email,
				client.id,
			])
			.then(([result]) => {
				if (result.affectedRows === 0) {
					return Promise.reject(new Error("Cliente no encontrado"));
				}
				return client;
			})
			.catch((error) => {
				if (error.message.includes("ER_BAD_FIELD_ERROR")) {
					return Promise.reject(new Error("Cliente no encontrado"));
				}
				if (error.message === "Cliente no encontrado") {
					return Promise.reject(new Error("Cliente no encontrado"));
				}
				return Promise.reject(
					new Error(`Error actualizando cliente: ${error.message}`),
				);
			});
	}

	delete(id: string): Promise<void> {
		const sql = "DELETE FROM clients WHERE id = ?";

		return pool
			.query(sql, [id])
			.then(() => {
				return; //
			})
			.catch((error) => {
				return Promise.reject(
					new Error(`Error eliminando cliente: ${error.message}`),
				);
			});
	}

	getAll(): Promise<ClientType[]> {
		const sql =
			"SELECT id, social_reason AS socialReason, company_name AS companyName, email FROM clients";

		return pool
			.query(sql)
			.then(([rows]) => {
				return rows as ClientType[];
			})
			.catch((error) => {
				return Promise.reject(
					new Error(`Error obteniendo clientes: ${error.message}`),
				);
			});
	}

	get(id: string): Promise<ClientType> {
		const sql =
			"SELECT id, social_reason AS socialReason, company_name AS companyName, email FROM clients WHERE id = ?";

		return pool
			.query<RowDataPacket[]>(sql, [id])
			.then(([rows]) => {
				if (rows.length === 0) {
					return Promise.reject(new Error("Cliente no encontrado"));
				}
				return rows[0] as ClientType;
			})
			.catch((error) => {
				if (error.message.includes("ER_BAD_FIELD_ERROR")) {
					return Promise.reject(new Error("Cliente no encontrado"));
				}
				if (error.message === "Cliente no encontrado") {
					return Promise.reject(new Error("Cliente no encontrado"));
				}
				return Promise.reject(
					new Error(`Error obteniendo cliente: ${error.message}`),
				);
			});
	}
}

export default new Client();
