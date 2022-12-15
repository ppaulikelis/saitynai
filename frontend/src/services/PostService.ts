import axios from "axios";
import { PostType } from "../Types";
import authHeader from "./AuthHeader";

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

	async post(data: PostType) {
		const response = await axios.post(API_URL + `/posts`, data, {
			headers: authHeader(),
		});
		return response.data;
	}

	async update(data: { postId: number; data: PostType }) {
		console.log(data);
		const response = await axios.put(
			API_URL + `/posts/${data.postId}`,
			data.data,
			{
				headers: authHeader(),
			}
		);
		return response.data;
	}

	async delete(id: number) {
		const response = await axios.delete(API_URL + `/posts/${id}`, {
			headers: authHeader(),
		});
		return response.data;
	}
}

export default new PostService();
