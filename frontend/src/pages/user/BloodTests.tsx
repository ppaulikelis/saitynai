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
import { BloodTestType, ErrorResponseType } from "../../Types";
import ErrorAlert from "../../components/ErrorAlert";
import { EnumsContext } from "../../components/EnumsContext";
import { useContext, useEffect, useState } from "react";
import {
	Box,
	Button,
	ButtonGroup,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { CurrentUserContext } from "../../components/CurrentUserContext";
import BloodTestService from "../../services/BloodTestService";

export default function BloodTests() {
	let { medicalCardId } = useParams();
	const userContext = useContext(CurrentUserContext);
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const enums = useContext(EnumsContext);

	const [openAddModal, setOpenAddModal] = useState(false);
	const handleOpenAddModal = () => setOpenAddModal(true);
	const handleCloseAddModal = () => setOpenAddModal(false);

	const [selected, setSelected] = useState(-1);

	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const handleOpenDeleteModal = (id: number) => {
		setSelected(id);
		setOpenDeleteModal(true);
	};
	const handleCloseDeleteModal = () => setOpenDeleteModal(false);

	const [openUpdateModal, setOpenUpdateModal] = useState(false);
	const handleOpenUpdateModal = (id: number) => {
		setSelected(id);
		setOpenUpdateModal(true);
	};
	const handleCloseUpdateModal = () => setOpenUpdateModal(false);

	const queryClient = useQueryClient();
	const { isLoading, error, data } = useQuery(
		["bloodTests", medicalCardId],
		() =>
			BloodTestService.getAll(parseInt(medicalCardId ? medicalCardId : "-1"))
	);

	const addMutation = useMutation(BloodTestService.post, {
		onSuccess: () => {
			queryClient.invalidateQueries("bloodTests");
			handleCloseAddModal();
			enqueueSnackbar("Blood test added", { variant: "success" });
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

	const deleteMutation = useMutation(BloodTestService.delete, {
		onSuccess: () => {
			queryClient.invalidateQueries("bloodTests");
			handleCloseDeleteModal();
			enqueueSnackbar("Blood test deleted", { variant: "success" });
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

	const updateMutation = useMutation(BloodTestService.update, {
		onSuccess: () => {
			queryClient.invalidateQueries("bloodTests");
			handleCloseUpdateModal();
			enqueueSnackbar("Blood test updated", { variant: "success" });
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
					<Button variant="contained" onClick={handleOpenAddModal}>
						Add
					</Button>
				</Box>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Date</TableCell>
								<TableCell align="right">Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((bloodTest: BloodTestType) => (
								<TableRow
									key={bloodTest.id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{new Date(bloodTest.date).toISOString().split("T")[0]}
									</TableCell>
									<TableCell align="right">
										<ButtonGroup
											variant="contained"
											aria-label="outlined primary button group"
										>
											<Button
												onClick={() =>
													navigate(`${bloodTest.id}/bloodtestanalytes`)
												}
											>
												View
											</Button>
											<Button
												onClick={() =>
													handleOpenUpdateModal(
														bloodTest.id ? bloodTest.id : -1
													)
												}
											>
												Edit
											</Button>
											<Button
												onClick={() =>
													handleOpenDeleteModal(
														bloodTest.id ? bloodTest.id : -1
													)
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
				<AddForm
					openAddModal={openAddModal}
					handleCloseAddModal={handleCloseAddModal}
					addMutation={addMutation}
					medicalCardId={medicalCardId}
				/>
				<DeleteForm
					openDeleteModal={openDeleteModal}
					handleCloseDeleteModal={handleCloseDeleteModal}
					selected={selected}
					medicalCardId={parseInt(medicalCardId ? medicalCardId : "-1")}
					deleteMutation={deleteMutation}
				/>
				<UpdateForm
					openUpdateModal={openUpdateModal}
					handleCloseUpdateModal={handleCloseUpdateModal}
					selected={selected}
					data={data}
					medicalCardId={parseInt(medicalCardId ? medicalCardId : "-1")}
					updateMutation={updateMutation}
				/>
			</>
		);
	};

	return userContext?.user ? (
		<PageContainer title="Blood Tests">{render()}</PageContainer>
	) : (
		<></>
	);
}

interface AddFormProps {
	openAddModal: boolean;
	handleCloseAddModal: () => void;
	addMutation: UseMutationResult<
		any,
		AxiosError<unknown, any>,
		BloodTestType,
		unknown
	>;
	medicalCardId: string | undefined;
}

function AddForm({
	openAddModal,
	handleCloseAddModal,
	addMutation,
	medicalCardId,
}: AddFormProps) {
	const [currentDate, setDate] = useState<string | null>(
		new Date().toISOString()
	);

	console.log(currentDate);

	const handleDateChange = (newValue: string | null) => {
		setDate(new Date(newValue ? newValue : "").toISOString());
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		addMutation.mutate({
			date: currentDate ? currentDate : new Date().toISOString(),
			medicalCardId: parseInt(medicalCardId ? medicalCardId : "-1"),
		});
	};

	return (
		<Dialog open={openAddModal} onClose={handleCloseAddModal}>
			<Box component="form" onSubmit={handleSubmit} noValidate p={3}>
				<DialogTitle sx={{ paddingX: "0px" }}>
					<Typography variant="h4" component="div" align="center">
						Add medical card
					</Typography>
				</DialogTitle>
				<DialogContent sx={{ paddingX: "0px" }}>
					<DatePicker
						openTo="year"
						views={["year", "month", "day"]}
						maxDate={new Date().toDateString()}
						label="Blood test date"
						inputFormat="yyyy-MM-dd"
						value={currentDate}
						onChange={handleDateChange}
						renderInput={(params) => (
							<TextField {...params} fullWidth margin="normal" />
						)}
					/>
				</DialogContent>
				<DialogActions sx={{ paddingX: "0px" }}>
					<ButtonGroup
						variant="contained"
						aria-label="outlined primary button group"
					>
						<Button onClick={handleCloseAddModal}>Cancel</Button>
						<Button type="submit">Add</Button>
					</ButtonGroup>
				</DialogActions>
			</Box>
		</Dialog>
	);
}

interface DeleteFormProps {
	openDeleteModal: boolean;
	handleCloseDeleteModal: () => void;
	selected: number;
	medicalCardId: number;
	deleteMutation: UseMutationResult<
		any,
		AxiosError<unknown, any>,
		{
			medicalCardId: number;
			bloodTestId: number;
		},
		unknown
	>;
}

function DeleteForm({
	openDeleteModal,
	handleCloseDeleteModal,
	selected,
	medicalCardId,
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
						<Button
							onClick={() =>
								deleteMutation.mutate({ medicalCardId, bloodTestId: selected })
							}
						>
							Delete
						</Button>
					</ButtonGroup>
				</DialogActions>
			</Box>
		</Dialog>
	);
}

interface UpdateFormProps {
	openUpdateModal: boolean;
	handleCloseUpdateModal: () => void;
	selected: number;
	data: any;
	medicalCardId: number;
	updateMutation: UseMutationResult<
		any,
		AxiosError<unknown, any>,
		{
			medicalCardId: number;
			bloodTestId: number;
			data: BloodTestType;
		},
		unknown
	>;
}

function UpdateForm({
	openUpdateModal,
	handleCloseUpdateModal,
	selected,
	data,
	medicalCardId,
	updateMutation,
}: UpdateFormProps) {
	useEffect(() => {
		const bt: BloodTestType = data.find(
			(bt: BloodTestType) => bt.id === selected
		);
		if (bt) {
			setDate(new Date(bt.date).toISOString());
		}
	}, [selected]);

	const [currentDate, setDate] = useState<string | null>(
		new Date().toISOString()
	);

	const handleDateChange = (newValue: string | null) => {
		setDate(new Date(newValue ? newValue : new Date()).toISOString());
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		updateMutation.mutate({
			medicalCardId,
			bloodTestId: selected,
			data: {
				date: currentDate ? currentDate : new Date().toISOString(),
			},
		});
	};

	return (
		<Dialog open={openUpdateModal} onClose={handleCloseUpdateModal}>
			<Box component="form" onSubmit={handleSubmit} noValidate p={3}>
				<DialogTitle sx={{ paddingX: "0px" }}>
					<Typography variant="h4" component="div" align="center">
						Update medical card
					</Typography>
				</DialogTitle>
				<DialogContent sx={{ paddingX: "0px" }}>
					<DatePicker
						openTo="year"
						views={["year", "month", "day"]}
						maxDate={new Date().toDateString()}
						label="Birthday"
						inputFormat="yyyy-MM-dd"
						value={currentDate}
						onChange={handleDateChange}
						renderInput={(params) => (
							<TextField {...params} fullWidth margin="normal" />
						)}
					/>
				</DialogContent>
				<DialogActions sx={{ paddingX: "0px" }}>
					<ButtonGroup
						variant="contained"
						aria-label="outlined primary button group"
					>
						<Button onClick={handleCloseUpdateModal}>Cancel</Button>
						<Button type="submit">Update</Button>
					</ButtonGroup>
				</DialogActions>
			</Box>
		</Dialog>
	);
}
