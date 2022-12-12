import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useContext } from "react";
import { CurrentUserContext } from "../components/CurrentUserContext";
import { Tooltip } from "@mui/material";

export default function SignUp() {
	const context = useContext(CurrentUserContext);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		context?.signUp({
			email: data.get("email") as string,
			password: data.get("password") as string,
		});
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<Tooltip
						title="Password must contain 8 to 20 characters, 1 upper character, 1 number, 1 special symbol"
						arrow
					>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
					</Tooltip>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 2, mb: 2 }}
					>
						Sign Up
					</Button>
					<Grid container>
						<Grid item xs>
							{/* <Link href="#" variant="body2">
								Forgot password?
							</Link> */}
						</Grid>
						<Grid item>
							<Link href="/signin" variant="body2">
								{"Already have an account? Sign In"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
