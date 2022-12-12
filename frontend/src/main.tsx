import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { CurrentUserProvider } from "./components/CurrentUserContext";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";
import { EnumsProvider } from "./components/EnumsContext";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<SnackbarProvider maxSnack={3}>
				<CurrentUserProvider>
					<EnumsProvider>
						<QueryClientProvider client={queryClient}>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<CssBaseline />
								<App />
							</LocalizationProvider>
						</QueryClientProvider>
					</EnumsProvider>
				</CurrentUserProvider>
			</SnackbarProvider>
		</BrowserRouter>
	</React.StrictMode>
);
