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
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../components/CurrentUserContext";
import PostService from "../../services/PostService";

export default function AddPost() {
	const userContext = useContext(CurrentUserContext);
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const addMutation = useMutation(PostService.post, {
		onSuccess: () => {
			enqueueSnackbar("Blog post added", { variant: "success" });
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
		addMutation.mutate({
			title: data.get("title") as string,
			description: data.get("description") as string,
			content: data.get("content") as string,
		});
	};

	return userContext?.user ? (
		<PageContainer title="Add blog post">
			{
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
							/>
						</Grid>
						<Grid lg={6} xs={12} sx={{ p: "10px" }}>
							<TextField
								required
								fullWidth
								id="description"
								label="Description"
								name="description"
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
							/>
						</Grid>
					</Grid>
					<Box
						sx={{ display: "flex", justifyContent: "flex-end" }}
						mb={2}
						mr={1}
					>
						<Button type="submit" variant="contained">
							Add
						</Button>
					</Box>
				</Box>
			}
		</PageContainer>
	) : (
		<></>
	);
}
