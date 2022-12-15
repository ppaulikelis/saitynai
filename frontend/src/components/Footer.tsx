import { Box, Link, Typography } from "@mui/material";

export default function Footer(props: any) {
	return (
		<Box
			sx={{
				position: "fixed",
				bottom: "0px",
				backgroundColor: "white",
				width: "100%",
				padding: "20px",
			}}
		>
			<Typography
				variant="body2"
				color="text.secondary"
				align="center"
				{...props}
			>
				{"Copyright © "}
				<Link color="inherit" href="http://127.0.0.1:5173/">
					Blood tests
				</Link>{" "}
				{new Date().getFullYear()}
				{"."}
			</Typography>
		</Box>
	);
}
