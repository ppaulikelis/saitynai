import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import MedicalCards from "../pages/MedicalCards";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { CurrentUserContext } from "./CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";

export default function Router() {
	const context = useContext(CurrentUserContext);

	return (
		<Routes>
			{/* Public Routes */}
			<Route path="/" element={<Home />} />
			<Route path="/blog" element={<Blog />} />
			<Route path="/blog/:postId" element={<BlogPost />} />
			<Route
				path="/signin"
				element={
					<ProtectedRoute isAllowed={!context?.user} outlet={<SignIn />} />
				}
			/>
			<Route
				path="/signup"
				element={
					<ProtectedRoute isAllowed={!context?.user} outlet={<SignUp />} />
				}
			/>
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute
						isAllowed={!!context?.user}
						redirectPath="/signin"
						outlet={<Dashboard />}
					/>
				}
			/>
			{/* User Routes */}
			<Route
				path="/user/medicalcards"
				element={
					<ProtectedRoute
						isAllowed={!!context?.user && context?.user.role === "USER"}
						redirectPath="/"
						outlet={<MedicalCards />}
					/>
				}
			/>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
