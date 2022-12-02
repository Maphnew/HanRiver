import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

import { Layout, Menu } from "antd";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons";

import { setSideMenu, setOpenSideMenuKeys, setCollapsed } from "../../redux/slices/sideMenuSlice";
import { setMessages } from "../../redux/slices/message-slice";
import { useGetDevApiQuery } from "../../redux/query/developmentQuery";

import messageService from "../../services/message-service";

import HeaderNav from "../../components/layout-components/HeaderNav";
import AppViews from "../../views/app-views";

import { SIDE_NAV_WIDTH, SIDE_NAV_COLLAPSED_WIDTH } from "../../configs/theme";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

let isInitial = true;

const AppLayout = () => {
    const sideMenu = useSelector((state) => state.sideMenu);
    const { data = {}, error, isLoading } = useGetDevApiQuery("sidemenu");
    let navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isInitial) {
            return;
        } else {
            isInitial = false;
        }
        const fetchMessages = async () => {
            const messages = await messageService.searchMessages();
            if (messages && messages.success) {
                dispatch(setMessages(messages.response));
            }
        };
        fetchMessages();
    }, []);

    useEffect(() => {
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            return;
        }
        dispatch(setSideMenu(data));
    }, [data]);

    const onCollapse = () => {
        dispatch(setCollapsed(!sideMenu.collapsed));
    };

    const recurringMenu = (data) => {
        return data.map((menu) => {
            if (menu.children) {
                return (
                    <SubMenu key={menu.propertyId} title={menu.propertyName}>
                        {recurringMenu(menu.children)}
                    </SubMenu>
                );
            } else {
                return (
                    <Menu.Item key={menu.propertyId} onClick={() => navigate(menu.pathname)}>
                        {menu.propertyName}
                    </Menu.Item>
                );
            }
        });
    };

    const openChangeHandler = (keys) => {
        dispatch(setOpenSideMenuKeys(keys));
    };

    return (
        <>
            <HeaderNav />
            <Layout hasSider={true}>
                <Sider
                    className="side-nav"
                    collapsible={true}
                    onCollapse={onCollapse}
                    width={SIDE_NAV_WIDTH}
                    collapsed={sideMenu.collapsed}
                    trigger={sideMenu.collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
                >
                    <Scrollbars autoHide>
                        <Menu
                            className="app-side-menu"
                            // theme="dark"
                            mode="inline"
                            openKeys={sideMenu.openKeys}
                            selectedKeys={sideMenu.selectedKeys}
                            onOpenChange={openChangeHandler}
                            // style={{ height: "100%", borderRight: 0 }}
                        >
                            {sideMenu.menu.length > 0 && recurringMenu(sideMenu.menu)}
                        </Menu>
                    </Scrollbars>
                </Sider>
                <Content>
                    <AppViews />
                </Content>
            </Layout>
        </>
    );
};

export default AppLayout;
