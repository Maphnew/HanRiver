import { Layout, Menu, Breadcrumb, Space, Avatar, Image, Popover } from "antd";
import {
    CodeFilled,
    HomeOutlined,
    BookOutlined,
    DotChartOutlined,
    ForkOutlined,
    SettingOutlined,
} from "@ant-design/icons";
const { Header, Sider } = Layout;

import NavProfile from "./NavProfile";
import { useState } from "react";

const HeaderNav = () => {
    const [mode, setMode] = useState("dark");
    const modeChangeHandler = () => {
        const bodyElement = document.querySelector("body");
        if (mode === "dark") {
            setMode("light")
            bodyElement.classList.add("ds-theme-dark");
            bodyElement.classList.remove("ds-theme-light");
        } else {
            setMode("dark")
            bodyElement.classList.add("ds-theme-light");
            bodyElement.classList.remove("ds-theme-dark");
        }
    }
    const content = (
        <div>
            <p style={{ cursor: "pointer" }} onClick={modeChangeHandler}>{mode} mode</p>
        </div>
    )
    return (
        <Header className="app-header">
            <div className="app-header-wrapper">
                <div className="logo">
                    <Space size={8}>
                        <CodeFilled
                            style={{
                                fontSize: 24,
                                color: "orange",
                                verticalAlign: "middle",
                            }}
                        />
                        <span>MetaStream</span>
                    </Space>
                </div>
                <div className="nav">
                    <div className="nav-left">
                        <Space size={32}>
                            <HomeOutlined
                                style={{
                                    fontSize: 24,
                                    color: "gray",
                                    verticalAlign: "middle",
                                    opacity: "50%",
                                }}
                            />
                            <BookOutlined
                                style={{
                                    fontSize: 24,
                                    color: "gray",
                                    verticalAlign: "middle",
                                    opacity: "50%",
                                }}
                            />
                            <DotChartOutlined
                                style={{
                                    fontSize: 24,
                                    color: "gray",
                                    verticalAlign: "middle",
                                    opacity: "50%",
                                }}
                            />
                            <ForkOutlined
                                style={{
                                    fontSize: 24,
                                    color: "gray",
                                    verticalAlign: "middle",
                                    opacity: "50%",
                                }}
                            />
                        </Space>
                    </div>
                    <div className="nav-right">
                        <NavProfile />
                    </div>
                    <Popover content={content} title={"Setting"} trigger={"click"} placement="bottomRight">
                        <SettingOutlined />
                    </Popover>
                </div>
            </div>
        </Header>
    );
};

export default HeaderNav;
