import { Alert, AlertTitle } from "@mui/material";

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
