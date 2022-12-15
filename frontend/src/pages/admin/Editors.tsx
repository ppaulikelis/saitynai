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
import {
	EditorType,
	ErrorResponseType,
	GenderType,
	MedicalCardType,
	UserType,
} from "../../Types";
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
	Tooltip,
	Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../components/CurrentUserContext";
import EditorService from "../../services/EditorService";

export default function Editors() {
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

	const queryClient = useQueryClient();
	const { isLoading, error, data } = useQuery("editors", EditorService.getAll);

	const addMutation = useMutation(EditorService.post, {
		onSuccess: () => {
			queryClient.invalidateQueries("editors");
			handleCloseAddModal();
			enqueueSnackbar("Editor registered", { variant: "success" });
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

	const deleteMutation = useMutation(EditorService.delete, {
		onSuccess: () => {
			queryClient.invalidateQueries("editors");
			handleCloseDeleteModal();
			enqueueSnackbar("Editor removed", { variant: "success" });
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
								<TableCell>Email</TableCell>
								<TableCell align="right">Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((editor: EditorType) => (
								<TableRow
									key={editor.id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{editor.email}
									</TableCell>
									<TableCell align="right">
										<ButtonGroup
											variant="contained"
											aria-label="outlined primary button group"
										>
											<Button
												onClick={() =>
													handleOpenDeleteModal(editor.id ? editor.id : -1)
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
				/>
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
		<PageContainer title="Editors">{render()}</PageContainer>
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
		EditorType,
		unknown
	>;
}

function AddForm({
	openAddModal,
	handleCloseAddModal,
	addMutation,
}: AddFormProps) {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		addMutation.mutate({
			email: data.get("email") as string,
			password: data.get("password") as string,
		});
	};

	return (
		<Dialog open={openAddModal} onClose={handleCloseAddModal}>
			<Box component="form" onSubmit={handleSubmit} noValidate p={3}>
				<DialogTitle sx={{ paddingX: "0px" }}>
					<Typography variant="h4" component="div" align="center">
						Register editor
					</Typography>
				</DialogTitle>
				<DialogContent sx={{ paddingX: "0px" }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email"
						name="email"
						autoFocus
					/>
					<Tooltip
						title="Password must contain 8 to 20 characters, 1 upper character, 1 number, 1 special symbol"
						arrow
					>
						<TextField
							type={"password"}
							margin="normal"
							required
							fullWidth
							id="password"
							label="Password"
							name="password"
							autoFocus
						/>
					</Tooltip>
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

// interface UpdateFormProps {
// 	openUpdateModal: boolean;
// 	handleCloseUpdateModal: () => void;
// 	genders?: GenderType[];
// 	selected: number;
// 	data: any;
// 	updateMutation: UseMutationResult<
// 		any,
// 		AxiosError<unknown, any>,
// 		{
// 			id: number;
// 			data: MedicalCardType;
// 		},
// 		unknown
// 	>;
// }

// function UpdateForm({
// 	openUpdateModal,
// 	handleCloseUpdateModal,
// 	genders,
// 	selected,
// 	data,
// 	updateMutation,
// }: UpdateFormProps) {
// 	useEffect(() => {
// 		const mc: MedicalCardType = data.find(
// 			(mc: MedicalCardType) => mc.id === selected
// 		);
// 		if (mc) {
// 			setName(mc.name);
// 			setSurname(mc.surname ? mc.surname : "");
// 			setGender(mc.genderId.toString());
// 			setDate(new Date(mc.birthDate).toISOString());
// 		}
// 	}, [selected]);

// 	const [currentName, setName] = useState("");

// 	const handleNameChange = (
// 		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// 	) => {
// 		setName(event.target.value);
// 	};

// 	const [currentSurname, setSurname] = useState("");

// 	const handleSurnameChange = (
// 		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// 	) => {
// 		setSurname(event.target.value);
// 	};

// 	const [currentGender, setGender] = useState("1");

// 	const handleGenderChange = (event: SelectChangeEvent) => {
// 		setGender(event.target.value);
// 	};

// 	const [currentDate, setDate] = useState<string | null>("");

// 	const handleDateChange = (newValue: string | null) => {
// 		setDate(new Date(newValue ? newValue : "").toISOString());
// 	};

// 	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
// 		event.preventDefault();
// 		updateMutation.mutate({
// 			id: selected,
// 			data: {
// 				name: currentName,
// 				surname: currentSurname,
// 				genderId: parseInt(currentGender) as number,
// 				birthDate: currentDate as string,
// 			},
// 		});
// 	};

// 	return (
// 		<Dialog open={openUpdateModal} onClose={handleCloseUpdateModal}>
// 			<Box component="form" onSubmit={handleSubmit} noValidate p={3}>
// 				<DialogTitle sx={{ paddingX: "0px" }}>
// 					<Typography variant="h4" component="div" align="center">
// 						Update medical card
// 					</Typography>
// 				</DialogTitle>
// 				<DialogContent sx={{ paddingX: "0px" }}>
// 					<TextField
// 						margin="normal"
// 						required
// 						fullWidth
// 						id="name"
// 						label="Name"
// 						name="name"
// 						autoComplete="name"
// 						autoFocus
// 						value={currentName}
// 						onChange={(e) => handleNameChange(e)}
// 					/>
// 					<TextField
// 						margin="normal"
// 						required
// 						fullWidth
// 						id="surname"
// 						label="Surname"
// 						name="surname"
// 						autoComplete="surname"
// 						autoFocus
// 						value={currentSurname}
// 						onChange={(e) => handleSurnameChange(e)}
// 					/>
// 					<FormControl fullWidth margin="normal">
// 						<InputLabel id="gender-select-label">Gender</InputLabel>
// 						<Select
// 							labelId="gender-select-label"
// 							id="gender-select"
// 							value={currentGender}
// 							label="Gender"
// 							name="gender"
// 							onChange={handleGenderChange}
// 							required
// 						>
// 							{genders?.map((gender: GenderType) => {
// 								return (
// 									<MenuItem key={gender.id} value={gender.id.toString()}>
// 										{gender.name}
// 									</MenuItem>
// 								);
// 							})}
// 						</Select>
// 					</FormControl>
// 					<DatePicker
// 						openTo="year"
// 						views={["year", "month", "day"]}
// 						maxDate={new Date().toDateString()}
// 						label="Birthday"
// 						inputFormat="yyyy-MM-dd"
// 						value={currentDate}
// 						onChange={handleDateChange}
// 						renderInput={(params) => (
// 							<TextField {...params} fullWidth margin="normal" />
// 						)}
// 					/>
// 				</DialogContent>
// 				<DialogActions sx={{ paddingX: "0px" }}>
// 					<ButtonGroup
// 						variant="contained"
// 						aria-label="outlined primary button group"
// 					>
// 						<Button onClick={handleCloseUpdateModal}>Cancel</Button>
// 						<Button type="submit">Update</Button>
// 					</ButtonGroup>
// 				</DialogActions>
// 			</Box>
// 		</Dialog>
// 	);
// }
