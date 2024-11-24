// cspell: disable
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Domicile as DomicileType } from "../types";
import pool from "../utils/mySQL";

class Domicile {
	create(domicile: DomicileType): Promise<DomicileType> {
		const sql =
			"INSERT INTO domiciles (id, address, colony, municipality, state, address_type) VALUES (?, ?, ?, ?, ?, ?)";

		return pool
			.query<ResultSetHeader>(sql, [
				domicile.id,
				domicile.address,
				domicile.colony,
				domicile.municipality,
				domicile.state,
				domicile.addressType,
			])
			.then(([result]) => {
				return { ...domicile };
			})
			.catch((error) => {
				console.error(`Error creando domicilio: ${error.message}`);
				return Promise.reject(
					new Error(`Error creando domicilio: ${error.message}`),
				);
			});
	}

	update(domicile: DomicileType): Promise<DomicileType> {
		const sql =
			"UPDATE domiciles SET address = ?, colony = ?, municipality = ?, state = ?, address_type = ? WHERE id = ?";

		return pool
			.query<ResultSetHeader>(sql, [
				domicile.address,
				domicile.colony,
				domicile.municipality,
				domicile.state,
				domicile.addressType,
				domicile.id,
			])
			.then(([result]) => {
				if (result.affectedRows === 0) {
					return Promise.reject(new Error("Domicilio no encontrado"));
				}
				return domicile;
			})
			.catch((error) => {
				if (error.message.includes("ER_BAD_FIELD_ERROR")) {
					return Promise.reject(new Error("Domicilio no encontrado"));
				}
				if (error.message === "Domicilio no encontrado") {
					return Promise.reject(new Error("Domicilio no encontrado"));
				}
				return Promise.reject(
					new Error(`Error actualizando domicilio: ${error.message}`),
				);
			});
	}

	delete(id: string): Promise<void> {
		const sql = "DELETE FROM domiciles WHERE id = ?";

		return pool
			.query(sql, [id])
			.then(() => {
				return;
			})
			.catch((error) => {
				return Promise.reject(
					new Error(`Error eliminando domicilio: ${error.message}`),
				);
			});
	}

	getAll(): Promise<DomicileType[]> {
		const sql =
			"SELECT id, address, colony, municipality, state, address_type AS addressType FROM domiciles";

		return pool
			.query<RowDataPacket[]>(sql)
			.then(([rows]) => {
				return rows as DomicileType[];
			})
			.catch((error) => {
				return Promise.reject(
					new Error(`Error obteniendo domicilios: ${error.message}`),
				);
			});
	}

	get(id: string): Promise<DomicileType> {
		const sql =
			"SELECT id, address, colony, municipality, state, address_type AS addressType FROM domiciles WHERE id = ?";

		return pool
			.query<RowDataPacket[]>(sql, [id])
			.then(([rows]) => {
				if (rows.length === 0) {
					return Promise.reject(new Error("Domicilio no encontrado"));
				}
				return rows[0] as DomicileType;
			})
			.catch((error) => {
				if (error.message.includes("ER_BAD_FIELD_ERROR")) {
					return Promise.reject(new Error("Domicilio no encontrado"));
				}
				if (error.message === "Domicilio no encontrado") {
					return Promise.reject(new Error("Domicilio no encontrado"));
				}
				return Promise.reject(
					new Error(`Error obteniendo domicilio: ${error.message}`),
				);
			});
	}
}

export default new Domicile();
