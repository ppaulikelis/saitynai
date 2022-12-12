import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

export default function LoadingScreen() {
	return (
		<Backdrop
			sx={{
				color: "#fff",
				zIndex: (theme: { zIndex: { drawer: number } }) =>
					theme.zIndex.drawer + 1,
			}}
			open={true}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
}
