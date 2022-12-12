import axios from "axios";
import { SignInType, SignUpType } from "../Types";

const API_URL = "http://localhost:8000/api/v1";

class AuthenticationService {
	signUp(data: SignUpType) {
		return axios.post(API_URL + "/signup", data);
	}

	signIn(data: SignInType) {
		return axios.post(API_URL + "/signin", data);
	}
}

export default new AuthenticationService();
