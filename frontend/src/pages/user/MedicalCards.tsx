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

export default function MedicalCards() {
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
		"medicalCards",
		MedicalCardService.getAll
	);

	const addMutation = useMutation(MedicalCardService.post, {
		onSuccess: () => {
			queryClient.invalidateQueries("medicalCards");
			handleCloseAddModal();
			enqueueSnackbar("Medical card added", { variant: "success" });
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

	const deleteMutation = useMutation(MedicalCardService.delete, {
		onSuccess: () => {
			queryClient.invalidateQueries("medicalCards");
			handleCloseDeleteModal();
			enqueueSnackbar("Medical card deleted", { variant: "success" });
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

	const updateMutation = useMutation(MedicalCardService.update, {
		onSuccess: () => {
			queryClient.invalidateQueries("medicalCards");
			handleCloseUpdateModal();
			enqueueSnackbar("Medical card updated", { variant: "success" });
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
								<TableCell>Name</TableCell>
								<TableCell>Surname</TableCell>
								<TableCell>Gender</TableCell>
								<TableCell>Age</TableCell>
								<TableCell align="right">Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((medicalCard: MedicalCardType) => (
								<TableRow
									key={medicalCard.id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{medicalCard.name}
									</TableCell>
									<TableCell component="th" scope="row">
										{medicalCard.surname}
									</TableCell>
									<TableCell>
										{enums?.getGender(medicalCard.genderId).name}
									</TableCell>
									<TableCell>{getAge(medicalCard.birthDate)}</TableCell>
									<TableCell align="right">
										<ButtonGroup
											variant="contained"
											aria-label="outlined primary button group"
										>
											<Button
												onClick={() => navigate(`${medicalCard.id}/bloodtests`)}
											>
												View
											</Button>
											<Button
												onClick={() =>
													handleOpenUpdateModal(
														medicalCard.id ? medicalCard.id : -1
													)
												}
											>
												Edit
											</Button>
											<Button
												onClick={() =>
													handleOpenDeleteModal(
														medicalCard.id ? medicalCard.id : -1
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
					genders={enums?.genders}
					addMutation={addMutation}
				/>
				<DeleteForm
					openDeleteModal={openDeleteModal}
					handleCloseDeleteModal={handleCloseDeleteModal}
					selected={selected}
					deleteMutation={deleteMutation}
				/>
				<UpdateForm
					openUpdateModal={openUpdateModal}
					handleCloseUpdateModal={handleCloseUpdateModal}
					genders={enums?.genders}
					selected={selected}
					data={data}
					updateMutation={updateMutation}
				/>
			</>
		);
	};

	return userContext?.user ? (
		<PageContainer title="Medical Cards">{render()}</PageContainer>
	) : (
		<></>
	);
}

function getAge(dateString: string) {
	var today = new Date();
	var birthDate = new Date(dateString);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}

interface AddFormProps {
	openAddModal: boolean;
	handleCloseAddModal: () => void;
	genders?: GenderType[];
	addMutation: UseMutationResult<any, unknown, MedicalCardType, unknown>;
}

function AddForm({
	openAddModal,
	handleCloseAddModal,
	genders,
	addMutation,
}: AddFormProps) {
	const [currentGender, setGender] = useState(
		genders ? genders[0].id.toString() : "1"
	);

	const handleGenderChange = (event: SelectChangeEvent) => {
		setGender(event.target.value);
	};

	const [currentDate, setDate] = useState<string | null>(
		new Date().toISOString()
	);

	const handleDateChange = (newValue: string | null) => {
		setDate(new Date(newValue ? newValue : "").toISOString());
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		addMutation.mutate({
			name: data.get("name") as string,
			surname: data.get("surname") as string,
			genderId: parseInt(currentGender) as number,
			birthDate: currentDate as string,
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
					<TextField
						margin="normal"
						required
						fullWidth
						id="name"
						label="Name"
						name="name"
						autoComplete="name"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						id="surname"
						label="Surname"
						name="surname"
						autoComplete="surname"
						autoFocus
					/>
					<FormControl fullWidth margin="normal">
						<InputLabel id="gender-select-label">Gender</InputLabel>
						<Select
							labelId="gender-select-label"
							id="gender-select"
							value={currentGender}
							label="Gender"
							name="gender"
							onChange={handleGenderChange}
							required
						>
							{genders?.map((gender: GenderType) => {
								return (
									<MenuItem key={gender.id} value={gender.id.toString()}>
										{gender.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
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

interface UpdateFormProps {
	openUpdateModal: boolean;
	handleCloseUpdateModal: () => void;
	genders?: GenderType[];
	selected: number;
	data: any;
	updateMutation: UseMutationResult<
		any,
		AxiosError<unknown, any>,
		{
			id: number;
			data: MedicalCardType;
		},
		unknown
	>;
}

function UpdateForm({
	openUpdateModal,
	handleCloseUpdateModal,
	genders,
	selected,
	data,
	updateMutation,
}: UpdateFormProps) {
	useEffect(() => {
		const mc: MedicalCardType = data.find(
			(mc: MedicalCardType) => mc.id === selected
		);
		if (mc) {
			setName(mc.name);
			setSurname(mc.surname ? mc.surname : "");
			setGender(mc.genderId.toString());
			setDate(new Date(mc.birthDate).toISOString());
		}
	}, [selected]);

	const [currentName, setName] = useState("");

	const handleNameChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setName(event.target.value);
	};

	const [currentSurname, setSurname] = useState("");

	const handleSurnameChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setSurname(event.target.value);
	};

	const [currentGender, setGender] = useState("1");

	const handleGenderChange = (event: SelectChangeEvent) => {
		setGender(event.target.value);
	};

	const [currentDate, setDate] = useState<string | null>("");

	const handleDateChange = (newValue: string | null) => {
		setDate(new Date(newValue ? newValue : "").toISOString());
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		updateMutation.mutate({
			id: selected,
			data: {
				name: currentName,
				surname: currentSurname,
				genderId: parseInt(currentGender) as number,
				birthDate: currentDate as string,
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
					<TextField
						margin="normal"
						required
						fullWidth
						id="name"
						label="Name"
						name="name"
						autoComplete="name"
						autoFocus
						value={currentName}
						onChange={(e) => handleNameChange(e)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						id="surname"
						label="Surname"
						name="surname"
						autoComplete="surname"
						autoFocus
						value={currentSurname}
						onChange={(e) => handleSurnameChange(e)}
					/>
					<FormControl fullWidth margin="normal">
						<InputLabel id="gender-select-label">Gender</InputLabel>
						<Select
							labelId="gender-select-label"
							id="gender-select"
							value={currentGender}
							label="Gender"
							name="gender"
							onChange={handleGenderChange}
							required
						>
							{genders?.map((gender: GenderType) => {
								return (
									<MenuItem key={gender.id} value={gender.id.toString()}>
										{gender.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
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
