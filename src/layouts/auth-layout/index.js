import { Routes, Route, Outlet, Link } from "react-router-dom";
import AuthViews from "../../views/auth-views";

const AuthLayout = (props) => {
    return (
        <div className="auth-container">
            <AuthViews />
        </div>
    );
};

export default AuthLayout;
