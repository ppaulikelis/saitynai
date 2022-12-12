import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
	isAllowed: boolean;
	redirectPath?: string;
	outlet: JSX.Element;
}

const ProtectedRoute = ({ isAllowed, redirectPath = "/", outlet }: Props) => {
	if (!isAllowed) {
		return <Navigate to={redirectPath} replace />;
	}
	return outlet;
};

export default ProtectedRoute;
