import { Box, Container, Typography } from "@mui/material";
import { ReactNode } from "react";

interface Props {
	title: string;
	children: ReactNode;
}

export default function PageContainer({ title, children }: Props) {
	return (
		<Container maxWidth="xl">
			<Box pb={3}>
				<Typography
					component="h1"
					variant="h2"
					gutterBottom
					mt={2}
					align="center"
				>
					{title}
				</Typography>
				{children}
			</Box>
		</Container>
	);
}
