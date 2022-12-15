import axios from "axios";
import { MedicalCardType, UserType } from "../Types";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8000/api/v1";

class EditorService {
	async getAll() {
		const response = await axios.get(API_URL + "/editors", {
			headers: authHeader(),
		});
		return response.data;
	}

	async post(data: UserType) {
		const response = await axios.post(API_URL + "/editors", data, {
			headers: authHeader(),
		});
		return response.data;
	}

	async delete(id: number) {
		const response = await axios.delete(API_URL + `/editors/${id}`, {
			headers: authHeader(),
		});
		return response.data;
	}
}

export default new EditorService();
