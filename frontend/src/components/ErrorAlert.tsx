import { Alert, AlertTitle } from "@mui/material";
import React from "react";

interface Props {
	message: string;
}

export default function ErrorAlert({ message }: Props) {
	return (
		<Alert severity="error">
			<AlertTitle>Error</AlertTitle>
			{message}
		</Alert>
	);
}
