import { createContext, ReactNode, useEffect, useState } from "react";
import { ErrorResponseType, SignInType, SignUpType, UserType } from "../Types";
import AuthenticationService from "../services/AuthenticationService";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar, VariantType } from "notistack";
import { Backdrop, CircularProgress } from "@mui/material";

interface Props {
	children?: ReactNode;
}

interface Value {
	user: UserType | null;
	signIn: (data: SignInType) => void;
	signUp: (data: SignUpType) => void;
	logOut: () => void;
}

export const CurrentUserContext = createContext<Value | null>(null);

export const CurrentUserProvider = ({ children }: Props) => {
	const [currentUser, setCurrentUser] = useState<UserType | null>(null);
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const user = localStorage.getItem("currentUser");
		if (user) setCurrentUser(JSON.parse(user));
	}, []);

	const signIn = async (data: SignInType) => {
		setLoading(true);
		AuthenticationService.signIn(data)
			.then((response: AxiosResponse) => {
				const user = response.data.user;
				const accessToken = response.data.accessToken;
				setCurrentUser(user);
				localStorage.setItem("currentUser", JSON.stringify(user));
				localStorage.setItem("accessToken", accessToken);
				setLoading(false);
				enqueueSnackbar(`Welcome, ${user.email}`, { variant: "success" });
				navigate("/dashboard");
			})
			.catch((error: AxiosError) => {
				const errorResponse = error.response?.data as ErrorResponseType;
				setLoading(false);
				enqueueSnackbar(errorResponse.message, { variant: "error" });
			});
	};

	const signUp = async (data: SignUpType) => {
		setLoading(true);
		AuthenticationService.signUp(data)
			.then((response: AxiosResponse) => {
				const email = response.data.email;
				enqueueSnackbar(`Account ${email} registered`, {
					variant: "success",
				});
				setLoading(false);
			})
			.catch((error: AxiosError) => {
				const errorResponse = error.response?.data as ErrorResponseType;
				setLoading(false);
				enqueueSnackbar(errorResponse.message, { variant: "error" });
			});
	};

	const logOut = (
		logOutMessage: string = "Logout successfull",
		variant: VariantType = "success"
	) => {
		localStorage.removeItem("currentUser");
		localStorage.removeItem("accessToken");
		setCurrentUser(null);
		navigate("/signin");
		enqueueSnackbar(logOutMessage, { variant: variant });
	};

	const value: Value = {
		user: currentUser,
		signIn,
		signUp,
		logOut,
	};

	return (
		<CurrentUserContext.Provider value={value}>
			{children}
			<Backdrop
				sx={{
					color: "#fff",
					zIndex: (theme: { zIndex: { drawer: number } }) =>
						theme.zIndex.drawer + 1,
				}}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</CurrentUserContext.Provider>
	);
};
