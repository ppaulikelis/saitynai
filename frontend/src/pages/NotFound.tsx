import { Box, Container, Typography } from "@mui/material";

export default function NotFound() {
	return (
		<Box
			sx={{
				pt: 8,
				pb: 6,
			}}
		>
			<Container maxWidth="sm">
				<Typography
					component="h1"
					variant="h2"
					align="center"
					color="text.primary"
					gutterBottom
				>
					404
				</Typography>
				<Typography
					variant="h5"
					align="center"
					color="text.secondary"
					paragraph
				>
					You seem to be lost. Please contact us if you are having issues with
					an app. We wish you to find a way back.
				</Typography>
			</Container>
		</Box>
	);
}
