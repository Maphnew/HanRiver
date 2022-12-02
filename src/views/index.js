import { Routes, Route, useRoutes, Outlet, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/auth-layout";
import AppLayout from "../layouts/app-layout";
import Login from "./auth-views/Login";
import Main from "./app-views/dashboard/main";
import Board from "./app-views/dashboard/board";
import UserManagement from "./app-views/system-management/user-management";
import RoleManagement from "./app-views/system-management/role-management";
import MenuManagement from "./app-views/system-management/menu-management";
import General from "./app-views/system-management/setting-management/general";
import DataStandardization from "./app-views/system-management/setting-management/data-standardization";
import MessageManagement from "./app-views/system-management/message-management";
import CommonCodeManagement from "./app-views/system-management/common-code-management";
import MetaClassManagement from "./app-views/system-management/meta-class-management";

const Views = (props) => {
    let element = useRoutes([
        {
            path: "/",
            element: <Navigate to="/dashboard/main" />,
        },
        {
            path: "/dashboard",
            element: <AppLayout />,
            children: [
                { path: "main", element: <Main /> },
                { path: "board", element: <Board /> },
            ],
        },
        {
            path: "/system-management",
            element: <AppLayout />,
            children: [
                {
                    path: "user-management",
                    element: <UserManagement />,
                },
                {
                    path: "role-management",
                    element: <RoleManagement />,
                },
                {
                    path: "menu-management",
                    element: <MenuManagement />,
                },
                {
                    path: "setting-management/general",
                    element: <General />,
                },
                {
                    path: "setting-management/data-standardization",
                    element: <DataStandardization />,
                },
                {
                    path: "message-management",
                    element: <MessageManagement />,
                },
                {
                    path: "common-code-management",
                    element: <CommonCodeManagement />,
                },
                {
                    path: "meta-class-management",
                    element: <MetaClassManagement />,
                },
            ],
        },
        {
            path: "/auth",
            element: <AuthLayout />,
            children: [{ path: "login", element: <Login /> }],
        },
        { path: "*", element: <Navigate to="/dashboard/main" /> },
    ]);
    return <>{element}</>;
};

export default Views;
