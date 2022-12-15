import axios from "axios";
import { BloodTestAnalyteType } from "../Types";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8000/api/v1";

class BloodTestAnalyteService {
	async getAll(medicalCardId: number, bloodTestId: number) {
		const response = await axios.get(
			API_URL +
				`/medical-cards/${medicalCardId}/blood-tests/${bloodTestId}/blood-test-analytes`,
			{
				headers: authHeader(),
			}
		);
		return response.data;
	}

	async post(data: {
		medicalCardId: number;
		bloodTestId: number;
		data: BloodTestAnalyteType;
	}) {
		const response = await axios.post(
			API_URL +
				`/medical-cards/${data.medicalCardId}/blood-tests/${data.bloodTestId}/blood-test-analytes`,
			data.data,
			{
				headers: authHeader(),
			}
		);
		return response.data;
	}

	async update(data: {
		medicalCardId: number;
		bloodTestId: number;
		bloodTestAnalyteId: number;
		data: BloodTestAnalyteType;
	}) {
		const response = await axios.put(
			API_URL +
				`/medical-cards/${data.medicalCardId}/blood-tests/${data.bloodTestId}/blood-test-analytes/${data.bloodTestAnalyteId}`,
			data.data,
			{
				headers: authHeader(),
			}
		);
		return response.data;
	}

	async delete(data: {
		medicalCardId: number;
		bloodTestId: number;
		bloodTestAnalyteId: number;
	}) {
		const response = await axios.delete(
			API_URL +
				`/medical-cards/${data.medicalCardId}/blood-tests/${data.bloodTestId}/blood-test-analytes/${data.bloodTestAnalyteId}`,
			{
				headers: authHeader(),
			}
		);
		return response.data;
	}
}

export default new BloodTestAnalyteService();
