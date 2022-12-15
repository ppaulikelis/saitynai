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
import LoadingScreen from "../../components/LoadingScreen";
import { AxiosError } from "axios";
import { ErrorResponseType, PostType } from "../../Types";
import ErrorAlert from "../../components/ErrorAlert";
import { useContext, useState } from "react";
import {
	Box,
	Button,
	ButtonGroup,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Paper,
	Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../components/CurrentUserContext";
import PostService from "../../services/PostService";

export default function Posts() {
	const userContext = useContext(CurrentUserContext);
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const [selected, setSelected] = useState(-1);

	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const handleOpenDeleteModal = (id: number) => {
		setSelected(id);
		setOpenDeleteModal(true);
	};
	const handleCloseDeleteModal = () => setOpenDeleteModal(false);

	const queryClient = useQueryClient();
	const { isLoading, error, data } = useQuery("posts", PostService.getAll);

	const deleteMutation = useMutation(PostService.delete, {
		onSuccess: () => {
			queryClient.invalidateQueries("posts");
			handleCloseDeleteModal();
			enqueueSnackbar("Blog post deleted", { variant: "success" });
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

	const render = () => {
		if (isLoading) {
			return <LoadingScreen />;
		}
		if (error) {
			const castedError = error as AxiosError;
			const errorResponse = castedError.response?.data as ErrorResponseType;
			if (errorResponse.status === 403) window.location.reload();
			return <ErrorAlert message={errorResponse.message} />;
		}
		return (
			<>
				<Box sx={{ display: "flex", justifyContent: "flex-end" }} mb={2}>
					<Button variant="contained" onClick={() => navigate("add")}>
						Add
					</Button>
				</Box>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Title</TableCell>
								<TableCell>Description</TableCell>
								<TableCell>Date</TableCell>
								<TableCell>Last Edited</TableCell>
								<TableCell align="right">Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((post: PostType) => (
								<TableRow
									key={post.id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{post.title}
									</TableCell>
									<TableCell
										component="th"
										scope="row"
										sx={{ textOverflow: "ellipsis" }}
									>
										{post.description}
									</TableCell>
									<TableCell>
										{
											new Date(post.date ? post.date : new Date())
												.toISOString()
												.split("T")[0]
										}
									</TableCell>
									<TableCell>
										{
											new Date(
												post.lastEditedDate ? post.lastEditedDate : new Date()
											)
												.toISOString()
												.split("T")[0]
										}
									</TableCell>
									<TableCell align="right">
										<ButtonGroup
											variant="contained"
											aria-label="outlined primary button group"
										>
											<Button onClick={() => navigate(`/blog/${post.id}`)}>
												View
											</Button>
											<Button onClick={() => navigate(`edit/${post.id}`)}>
												Edit
											</Button>
											<Button
												onClick={() =>
													handleOpenDeleteModal(post.id ? post.id : -1)
												}
											>
												Delete
											</Button>
										</ButtonGroup>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<DeleteForm
					openDeleteModal={openDeleteModal}
					handleCloseDeleteModal={handleCloseDeleteModal}
					selected={selected}
					deleteMutation={deleteMutation}
				/>
			</>
		);
	};

	return userContext?.user ? (
		<PageContainer title="Blog posts">{render()}</PageContainer>
	) : (
		<></>
	);
}

interface DeleteFormProps {
	openDeleteModal: boolean;
	handleCloseDeleteModal: () => void;
	selected: number;
	deleteMutation: UseMutationResult<
		any,
		AxiosError<unknown, any>,
		number,
		unknown
	>;
}

function DeleteForm({
	openDeleteModal,
	handleCloseDeleteModal,
	selected,
	deleteMutation,
}: DeleteFormProps) {
	return (
		<Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
			<Box p={3}>
				<DialogTitle sx={{ paddingX: "0px" }}>
					<Typography variant="h4" component="div" align="left">
						Confirm delete?
					</Typography>
				</DialogTitle>
				<DialogContent sx={{ paddingX: "0px" }}>
					<Typography variant="body2" align="justify">
						Record will be lost for ever. Please consider this action carefully.
					</Typography>
				</DialogContent>
				<DialogActions sx={{ paddingX: "0px" }}>
					<ButtonGroup
						variant="contained"
						aria-label="outlined primary button group"
					>
						<Button onClick={handleCloseDeleteModal}>Cancel</Button>
						<Button onClick={() => deleteMutation.mutate(selected)}>
							Delete
						</Button>
					</ButtonGroup>
				</DialogActions>
			</Box>
		</Dialog>
	);
}
