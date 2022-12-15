import PageContainer from "../components/PageContainer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
	Backdrop,
	Box,
	CardActionArea,
	CircularProgress,
	Stack,
} from "@mui/material";
import { useQuery } from "react-query";
import PostService from "../services/PostService";
import { ErrorResponseType, PostType } from "../Types";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { AxiosError } from "axios";
import ErrorAlert from "../components/ErrorAlert";

export default function Blog() {
	const { isLoading, error, data } = useQuery("posts", PostService.getAll);

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
			<Stack spacing={2}>
				{data.map((post: PostType) => {
					return <BlogPostCard key={post.id} post={post} />;
				})}
			</Stack>
		);
	};

	return <PageContainer title={"Blog"}>{render()}</PageContainer>;
}

interface Props {
	post: PostType;
}

function BlogPostCard({ post }: Props) {
	const navigate = useNavigate();
	return (
		<Card onClick={() => navigate("/blog/" + post.id)}>
			<CardActionArea>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{post.title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{post.description}
					</Typography>
					<Typography variant="body2" color="text.secondary" align="right">
						{
							new Date(post.date ? post.date : new Date())
								.toISOString()
								.split("T")[0]
						}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
