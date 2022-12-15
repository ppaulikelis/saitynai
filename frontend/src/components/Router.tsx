import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import BloodTestAnalytes from "../pages/user/BloodTestAnalytes";
import BloodTests from "../pages/user/BloodTests";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import MedicalCards from "../pages/user/MedicalCards";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { CurrentUserContext } from "./CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import Editors from "../pages/admin/Editors";

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
						isAllowed={
							context?.isRegistered ||
							(!!context?.user && context?.user.role === "USER")
						}
						redirectPath="/"
						outlet={<MedicalCards />}
					/>
				}
			/>
			<Route
				path="/user/medicalcards/:medicalCardId/bloodtests"
				element={
					<ProtectedRoute
						isAllowed={
							context?.isRegistered ||
							(!!context?.user && context?.user.role === "USER")
						}
						redirectPath="/"
						outlet={<BloodTests />}
					/>
				}
			/>
			<Route
				path="/user/medicalcards/:medicalCardId/bloodtests/:bloodTestId/bloodtestanalytes"
				element={
					<ProtectedRoute
						isAllowed={
							context?.isRegistered ||
							(!!context?.user && context?.user.role === "USER")
						}
						redirectPath="/"
						outlet={<BloodTestAnalytes />}
					/>
				}
			/>
			{/* Admin Routes */}
			<Route
				path="/admin/editors"
				element={
					<ProtectedRoute
						isAllowed={
							context?.isRegistered ||
							(!!context?.user && context?.user.role === "ADMIN")
						}
						redirectPath="/"
						outlet={<Editors />}
					/>
				}
			/>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
