import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../components/CurrentUserContext";
import PageContainer from "../components/PageContainer";

export default function About() {
	const context = useContext(CurrentUserContext);
	const navigate = useNavigate();
	return (
		<PageContainer title="About us">
			<Grid container spacing={2}>
				<Grid lg={6} xs={12}>
					<Box p={5}>
						<Typography
							variant="h5"
							align="justify"
							color="text.secondary"
							paragraph
						>
							Keep track of your blood tests anytime, anyplace. Add as many
							blood tests as you please. Your health is very important to us and
							it should be to you. Keep track of your blood tests anytime,
							anyplace. Add as many blood tests as you please. Your health is
							very important to us and it should be to you. Keep track of your
							blood tests anytime, anyplace. Add as many blood tests as you
							please. Your health is very important to us and it should be to
							you. Keep track of your blood tests anytime, anyplace. Add as many
							blood tests as you please. Your health is very important to us and
							it should be to you. Add as many blood tests as you please. Your
							health is very important to us and it should be to you.
						</Typography>
					</Box>
				</Grid>
				<Grid lg={6} xs={12}>
					<Box display={"flex"} p={5} justifyContent="center">
						<img
							src={"/about1.jpg"}
							alt={"About us image"}
							loading="lazy"
							style={{
								height: "auto",
								width: "100%",
								objectFit: "contain",
								maxWidth: "750px",
							}}
						/>
					</Box>
				</Grid>
			</Grid>
		</PageContainer>
	);
}
