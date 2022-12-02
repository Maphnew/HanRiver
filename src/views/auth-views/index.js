import { Routes, Route, Outlet, Link } from "react-router-dom";
import Login from "./Login";

const AuthViews = (props) => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default AuthViews;
