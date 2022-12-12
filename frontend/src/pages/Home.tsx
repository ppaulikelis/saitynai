import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../components/CurrentUserContext";

export default function Home() {
	const context = useContext(CurrentUserContext);
	const navigate = useNavigate();
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
					Blood tests
				</Typography>
				<Typography
					variant="h5"
					align="center"
					color="text.secondary"
					paragraph
				>
					Keep track of your blood tests anytime, anyplace. Add as many blood
					tests as you please. Your health is very important to us and it should
					be to you.
				</Typography>
				<Stack
					sx={{ pt: 2 }}
					direction="row"
					spacing={2}
					justifyContent="center"
				>
					<Button
						onClick={() => {
							if (!!context?.user) {
								navigate("/dashboard");
							} else {
								navigate("/signup");
							}
						}}
						variant="contained"
					>
						Get started
					</Button>
					<Button variant="outlined">About us</Button>
				</Stack>
			</Container>
		</Box>
	);
}
