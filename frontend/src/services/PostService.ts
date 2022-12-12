import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";

class PostService {
	async getAll() {
		const response = await axios.get(API_URL + "/posts");
		return response.data;
	}

	async get(id: number) {
		const response = await axios.get(API_URL + `/posts/${id}`);
		return response.data;
	}
}

export default new PostService();
