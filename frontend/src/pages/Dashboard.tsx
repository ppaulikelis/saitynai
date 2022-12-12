import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from "../components/CurrentUserContext";

export default function Dashboard() {
	const context = useContext(CurrentUserContext);

	if (!context?.user) {
		return <Navigate to={"/signin"} replace />;
	}

	if (context?.user.role === "USER") {
		return <Navigate to={"/user/medicalcards"} replace />;
	}

	if (context?.user.role === "EDITOR") {
		return <Navigate to={"/editor/posts"} replace />;
	}

	if (context?.user.role === "ADMIN") {
		return <Navigate to={"/user/editors"} replace />;
	}

	return <Navigate to={"/"} replace />;
}
