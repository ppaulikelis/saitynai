import axios from "axios";
import { MedicalCardType } from "../Types";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8000/api/v1";

class MedicalCardService {
	async getAll() {
		const response = await axios.get(API_URL + "/medical-cards", {
			headers: authHeader(),
		});
		return response.data;
	}

	async get(id: number) {
		const response = await axios.get(API_URL + `/medical-cards/${id}`, {
			headers: authHeader(),
		});
		return response.data;
	}

	async post(data: MedicalCardType) {
		const response = await axios.post(API_URL + "/medical-cards", data, {
			headers: authHeader(),
		});
		return response.data;
	}

	async update(data: { id: number; data: MedicalCardType }) {
		const response = await axios.put(
			API_URL + `/medical-cards/${data.id}`,
			data.data,
			{
				headers: authHeader(),
			}
		);
		return response.data;
	}

	async delete(id: number) {
		const response = await axios.delete(API_URL + `/medical-cards/${id}`, {
			headers: authHeader(),
		});
		return response.data;
	}
}

export default new MedicalCardService();
