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
import {
	BloodTestAnalyteType,
	BtaDescriptionType,
	ErrorResponseType,
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
	Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { CurrentUserContext } from "../../components/CurrentUserContext";
import BloodTestAnalyteService from "../../services/BloodTestAnalyteService";

export default function BloodTests() {
	let { medicalCardId, bloodTestId } = useParams();
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
		["bloodTestAnalytes", medicalCardId, bloodTestId],
		() =>
			BloodTestAnalyteService.getAll(
				parseInt(medicalCardId ? medicalCardId : "-1"),
				parseInt(bloodTestId ? bloodTestId : "-1")
			)
	);

	const addMutation = useMutation(BloodTestAnalyteService.post, {
		onSuccess: () => {
			queryClient.invalidateQueries("bloodTestAnalytes");
			handleCloseAddModal();
			enqueueSnackbar("Blood test analyte added", { variant: "success" });
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

	const deleteMutation = useMutation(BloodTestAnalyteService.delete, {
		onSuccess: () => {
			queryClient.invalidateQueries("bloodTestAnalytes");
			handleCloseDeleteModal();
			enqueueSnackbar("Blood test analyte deleted", { variant: "success" });
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

	const updateMutation = useMutation(BloodTestAnalyteService.update, {
		onSuccess: () => {
			queryClient.invalidateQueries("bloodTestAnalytes");
			handleCloseUpdateModal();
			enqueueSnackbar("Blood test analyte updated", { variant: "success" });
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
					<Button
						variant="contained"
						onClick={() => {
							if (
								data.length <
								(enums?.btaDescriptions ? enums?.btaDescriptions.length : 0)
							)
								handleOpenAddModal();
							else
								enqueueSnackbar("All analytes added", { variant: "warning" });
						}}
					>
						Add
					</Button>
				</Box>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Analyte</TableCell>
								<TableCell>Value</TableCell>
								<TableCell align="right">Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((bloodTestAnalyte: BloodTestAnalyteType) => (
								<TableRow
									key={bloodTestAnalyte.id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{`${
											enums?.getBtaDescription(
												bloodTestAnalyte.bloodTestAnalyteDescriptionId
											).name
										} (${
											enums?.getBtaDescription(
												bloodTestAnalyte.bloodTestAnalyteDescriptionId
											).abbreviation
										})`}
									</TableCell>
									<TableCell component="th" scope="row">
										{`${bloodTestAnalyte.value} ${
											enums?.getBtaDescription(
												bloodTestAnalyte.bloodTestAnalyteDescriptionId
											).unit
										}`}
									</TableCell>
									<TableCell align="right">
										<ButtonGroup
											variant="contained"
											aria-label="outlined primary button group"
										>
											<Button
												onClick={() =>
													handleOpenUpdateModal(
														bloodTestAnalyte.id ? bloodTestAnalyte.id : -1
													)
												}
											>
												Edit
											</Button>
											<Button
												onClick={() =>
													handleOpenDeleteModal(
														bloodTestAnalyte.id ? bloodTestAnalyte.id : -1
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
					bloodTestId={bloodTestId}
					btaDescriptions={enums?.btaDescriptions.filter(
						(btad) =>
							!data.some(
								(d: BloodTestAnalyteType) =>
									d.bloodTestAnalyteDescriptionId === btad.id
							)
					)}
				/>
				<DeleteForm
					openDeleteModal={openDeleteModal}
					handleCloseDeleteModal={handleCloseDeleteModal}
					selected={selected}
					medicalCardId={parseInt(medicalCardId ? medicalCardId : "-1")}
					bloodTestId={parseInt(bloodTestId ? bloodTestId : "-1")}
					deleteMutation={deleteMutation}
				/>
				<UpdateForm
					openUpdateModal={openUpdateModal}
					handleCloseUpdateModal={handleCloseUpdateModal}
					selected={selected}
					data={data}
					medicalCardId={parseInt(medicalCardId ? medicalCardId : "-1")}
					bloodTestId={parseInt(bloodTestId ? bloodTestId : "-1")}
					updateMutation={updateMutation}
					btaDescriptions={enums?.btaDescriptions.filter(
						(btad) =>
							!data.some((d: BloodTestAnalyteType) => {
								if (d.id === selected) {
									return false;
								}
								return d.bloodTestAnalyteDescriptionId === btad.id;
							})
					)}
				/>
			</>
		);
	};

	return userContext?.user ? (
		<PageContainer title="Blood Test Analytes">{render()}</PageContainer>
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
		{
			medicalCardId: number;
			bloodTestId: number;
			data: BloodTestAnalyteType;
		},
		unknown
	>;
	medicalCardId: string | undefined;
	bloodTestId: string | undefined;
	btaDescriptions: BtaDescriptionType[] | undefined;
}

function AddForm({
	openAddModal,
	handleCloseAddModal,
	addMutation,
	medicalCardId,
	bloodTestId,
	btaDescriptions,
}: AddFormProps) {
	useEffect(() => {
		if (btaDescriptions) {
			setDescription(
				btaDescriptions[0] ? btaDescriptions[0].id.toString() : "1"
			);
		}
	}, [btaDescriptions]);

	const [currentDescription, setDescription] = useState(
		btaDescriptions && btaDescriptions.length > 0
			? btaDescriptions[0].id.toString()
			: "1"
	);

	const handleDescriptionChange = (event: SelectChangeEvent) => {
		setDescription(event.target.value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		addMutation.mutate({
			medicalCardId: parseInt(medicalCardId ? medicalCardId : "-1"),
			bloodTestId: parseInt(bloodTestId ? bloodTestId : "-1"),
			data: {
				value: parseFloat(data.get("value") as string),
				bloodTestAnalyteDescriptionId: parseInt(currentDescription),
			},
		});
	};

	return (
		<Dialog open={openAddModal} onClose={handleCloseAddModal}>
			<Box component="form" onSubmit={handleSubmit} noValidate p={3}>
				<DialogTitle sx={{ paddingX: "0px" }}>
					<Typography variant="h4" component="div" align="center">
						Add blood test analyte
					</Typography>
				</DialogTitle>
				<DialogContent sx={{ paddingX: "0px" }}>
					<FormControl fullWidth margin="normal">
						<InputLabel id="description-select-label">Analyte</InputLabel>
						<Select
							labelId="description-select-label"
							id="description-select"
							value={currentDescription}
							label="Analyte"
							name="analyte"
							onChange={handleDescriptionChange}
							required
						>
							{btaDescriptions?.map((btaDescription: BtaDescriptionType) => {
								return (
									<MenuItem
										key={btaDescription.id}
										value={btaDescription.id.toString()}
									>
										{btaDescription.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<TextField
						margin="normal"
						required
						fullWidth
						id="value"
						name="value"
						label="Value"
						type="number"
						autoFocus
						defaultValue={"0"}
						InputProps={{ inputProps: { min: 0, max: 9999, step: "0.1" } }}
						InputLabelProps={{
							shrink: true,
						}}
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
	bloodTestId: number;
	deleteMutation: UseMutationResult<
		any,
		AxiosError<unknown, any>,
		{
			medicalCardId: number;
			bloodTestId: number;
			bloodTestAnalyteId: number;
		},
		unknown
	>;
}

function DeleteForm({
	openDeleteModal,
	handleCloseDeleteModal,
	selected,
	medicalCardId,
	bloodTestId,
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
								deleteMutation.mutate({
									medicalCardId,
									bloodTestId,
									bloodTestAnalyteId: selected ? selected : -1,
								})
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
	bloodTestId: number;
	updateMutation: UseMutationResult<
		any,
		AxiosError<unknown, any>,
		{
			medicalCardId: number;
			bloodTestId: number;
			bloodTestAnalyteId: number;
			data: BloodTestAnalyteType;
		},
		unknown
	>;
	btaDescriptions: BtaDescriptionType[] | undefined;
}

function UpdateForm({
	openUpdateModal,
	handleCloseUpdateModal,
	selected,
	data,
	medicalCardId,
	bloodTestId,
	updateMutation,
	btaDescriptions,
}: UpdateFormProps) {
	useEffect(() => {
		const bta: BloodTestAnalyteType = data.find(
			(bta: BloodTestAnalyteType) => bta.id === selected
		);
		if (bta) {
			setValue(bta.value);
			setDescription(bta.bloodTestAnalyteDescriptionId.toString());
		}
	}, [selected]);

	const [currentDescription, setDescription] = useState(
		btaDescriptions && btaDescriptions.length > 0
			? btaDescriptions[0].id.toString()
			: "1"
	);

	const handleDescriptionChange = (event: SelectChangeEvent) => {
		setDescription(event.target.value);
	};

	const [currentValue, setValue] = useState(0);

	const handleValueChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setValue(parseFloat(event.target.value));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		updateMutation.mutate({
			medicalCardId,
			bloodTestId,
			bloodTestAnalyteId: selected,
			data: {
				value: currentValue,
				bloodTestAnalyteDescriptionId: parseInt(currentDescription),
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
					<FormControl fullWidth margin="normal">
						<InputLabel id="description-select-label">Analyte</InputLabel>
						<Select
							labelId="description-select-label"
							id="description-select"
							value={currentDescription}
							label="Analyte"
							name="analyte"
							onChange={handleDescriptionChange}
							required
						>
							{btaDescriptions?.map((btaDescription: BtaDescriptionType) => {
								return (
									<MenuItem
										key={btaDescription.id}
										value={btaDescription.id.toString()}
									>
										{btaDescription.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<TextField
						margin="normal"
						required
						fullWidth
						id="value"
						name="value"
						label="Value"
						type="number"
						autoFocus
						value={currentValue}
						InputProps={{ inputProps: { min: 0, max: 9999, step: "0.1" } }}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(e) => handleValueChange(e)}
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
