import {
	Alert,
	AlertTitle,
	Backdrop,
	CircularProgress,
	Paper,
	Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import LoadingScreen from "../components/LoadingScreen";
import PageContainer from "../components/PageContainer";
import PostService from "../services/PostService";
import { ErrorResponseType } from "../Types";

export default function BlogPost() {
	const { postId } = useParams();
	const { isLoading, error, data } = useQuery("post", () =>
		PostService.get(postId as unknown as number)
	);

	const render = () => {
		if (isLoading) {
			return <LoadingScreen />;
		}
		if (error) {
			const castedError = error as AxiosError;
			const errorResponse = castedError.response?.data as ErrorResponseType;
			return <ErrorAlert message={errorResponse.message} />;
		}
		return (
			<>
				<Paper sx={{ padding: "20px" }}>
					<Typography variant="h4">{data.title}</Typography>
					<Typography variant="body2" color="text.secondary">
						{data.description}
					</Typography>
					<Typography variant="body2" color="text.secondary" gutterBottom>
						{new Date(data.date).toDateString()}
					</Typography>
					<Typography align="justify" pt={4}>
						{data.content}
					</Typography>
				</Paper>
			</>
		);
	};

	return <PageContainer title={"Post"}>{render()}</PageContainer>;
}
