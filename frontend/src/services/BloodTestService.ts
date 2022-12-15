import axios from "axios";
import { BloodTestType, MedicalCardType } from "../Types";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8000/api/v1";

class BloodTestService {
	async getAll(medicalCardId: number) {
		const response = await axios.get(
			API_URL + `/medical-cards/${medicalCardId}/blood-tests`,
			{
				headers: authHeader(),
			}
		);
		return response.data;
	}

	// async get(id: number) {
	// 	const response = await axios.get(API_URL + `/medical-cards/${id}`, {
	// 		headers: authHeader(),
	// 	});
	// 	return response.data;
	// }

	async post(data: BloodTestType) {
		const response = await axios.post(
			API_URL + `/medical-cards/${data.medicalCardId}/blood-tests`,
			{ date: data.date },
			{
				headers: authHeader(),
			}
		);
		return response.data;
	}

	async update(data: {
		medicalCardId: number;
		bloodTestId: number;
		data: BloodTestType;
	}) {
		const response = await axios.put(
			API_URL +
				`/medical-cards/${data.medicalCardId}/blood-tests/${data.bloodTestId}`,
			data.data,
			{
				headers: authHeader(),
			}
		);
		return response.data;
	}

	async delete(data: { medicalCardId: number; bloodTestId: number }) {
		const response = await axios.delete(
			API_URL +
				`/medical-cards/${data.medicalCardId}/blood-tests/${data.bloodTestId}`,
			{
				headers: authHeader(),
			}
		);
		return response.data;
	}
}

export default new BloodTestService();
