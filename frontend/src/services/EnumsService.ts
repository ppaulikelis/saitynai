import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";

class EnumsService {
	getGenders() {
		return axios.get(API_URL + "/genders");
	}

	getBtaDescriptions() {
		return axios.get(API_URL + "/blood-test-analyte-descriptions");
	}
}

export default new EnumsService();
