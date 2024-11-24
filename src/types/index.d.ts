import AddressType from "./addressType";
export type Client = {
	id: string;
	socialReason: string;
	companyName: string;
	email: string;
};

export type Domicile = {
	id: string;
	address: string;
	colony: string;
	municipality: string;
	state: string;
	addressType: AddressType;
};

export type Product = {
	id: string;
	name: string;
	measureUnit: string;
	basePrice: number;
};
