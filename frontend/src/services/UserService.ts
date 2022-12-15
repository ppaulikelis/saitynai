import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8000/api/v1";

class UserService {
	async get() {
		return axios.get(API_URL + "/user/me", {
			headers: authHeader(),
		});
	}
}

export default new UserService();
