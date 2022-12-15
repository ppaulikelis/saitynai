import PageContainer from "../../components/PageContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
	useMutation,
	UseMutationResult,
	useQuery,
	useQueryClient,
} from "react-query";
import MedicalCardService from "../../services/MedicalCardService";
import LoadingScreen from "../../components/LoadingScreen";
import { AxiosError } from "axios";
import { ErrorResponseType, GenderType, MedicalCardType } from "../../Types";
import ErrorAlert from "../../components/ErrorAlert";
import { EnumsContext } from "../../components/EnumsContext";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
	Box,
	Button,
	ButtonGroup,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	TextField,
	Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { CurrentUserContext } from "../../components/CurrentUserContext";
import PostService from "../../services/PostService";

export default function EditPost() {
	const { postId } = useParams();
	const userContext = useContext(CurrentUserContext);
	const { enqueueSnackbar } = useSnackbar();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [content, setContent] = useState("");

	const queryClient = useQueryClient();
	const { isLoading, error, data } = useQuery("post", () =>
		PostService.get(postId as unknown as number)
	);

	useEffect(() => {
		if (data) {
			setTitle(data.title);
			setDescription(data.description);
			setContent(data.content);
		}
	}, [data]);

	const updateMutation = useMutation(PostService.update, {
		onSuccess: () => {
			queryClient.invalidateQueries("post");
			enqueueSnackbar("Blog post updated", { variant: "success" });
		},
		onError(error: AxiosError, variables, context) {
			const castedError = error as AxiosError;
			const errorResponse = castedError.response?.data as ErrorResponseType;
			if (errorResponse.status === 403) {
				userContext?.logOut("Session expired", "warning");
			} else {
				enqueueSnackbar(errorResponse.message, { variant: "error" });
			}
		},
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		updateMutation.mutate({
			postId: parseInt(postId ? postId : "-1"),
			data: {
				title: data.get("title") as string,
				description: data.get("description") as string,
				content: data.get("content") as string,
			},
		});
	};

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
				<Box
					component="form"
					onSubmit={handleSubmit}
					noValidate
					sx={{ mt: "40px" }}
				>
					<Grid container spacing={2}>
						<Grid lg={6} xs={12} sx={{ p: "10px" }}>
							<TextField
								required
								fullWidth
								id="title"
								label="Title"
								name="title"
								autoFocus
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Grid>
						<Grid lg={6} xs={12} sx={{ p: "10px" }}>
							<TextField
								required
								fullWidth
								id="description"
								label="Description"
								name="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Grid>
						<Grid xs={12} sx={{ p: "10px" }}>
							<TextField
								required
								fullWidth
								id="content"
								label="Content"
								name="content"
								multiline={true}
								rows={20}
								value={content}
								onChange={(e) => setContent(e.target.value)}
							/>
						</Grid>
					</Grid>
					<Box
						sx={{ display: "flex", justifyContent: "flex-end" }}
						mb={2}
						mr={1}
					>
						<Button type="submit" variant="contained">
							Update
						</Button>
					</Box>
				</Box>
			</>
		);
	};

	return userContext?.user ? (
		<PageContainer title="Add blog post">{render()}</PageContainer>
	) : (
		<></>
	);
}
