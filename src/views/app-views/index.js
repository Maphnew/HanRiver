import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, Button, Breadcrumb } from "antd";

import {
    setOpenSideMenuKeys,
    setSelectedSideMenuKeys,
} from "../../redux/slices/sideMenuSlice";

import tabContent from "../../configs/tab-contents";
import {
    getParentsKeysByList,
    getParentByTree,
    getMenuAsArray,
    getMenuDataByPathname,
    getMenuDataById,
} from "../../utils/tabs";

const { TabPane } = Tabs;

const AppViews = (props) => {
    const [activeTabKey, setActiveTabKey] = useState("");
    const [panes, setPanes] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [menuDataList, setMenuDataList] = useState([]);
    const sideMenu = useSelector((state) => state.sideMenu);

    const dispatch = useDispatch();
    let location = useLocation();
    let navigate = useNavigate();

    const isExistPane = (panes) => {
        const exist = panes.find((pane) => pane.pathname === location.pathname);
        return exist;
    };

    useEffect(() => {
        const menuArray = getMenuAsArray(sideMenu.menu);
        setMenuDataList(menuArray);
    }, [sideMenu.menu]);

    useEffect(() => {
        if (menuDataList.length === 0) {
            return;
        }
        let menu = getMenuDataByPathname(menuDataList, location.pathname);
        if (!menu) {
            return;
        }

        setSelectedMenu(menu);
        setPanes((prevState) => {
            if (isExistPane(prevState)) {
                if (prevState.length === 1) {
                    prevState[0].closable = false;
                    return [].concat(prevState);
                } else {
                    return prevState.map((pane) => {
                        pane.closable = true;
                        return pane;
                    });
                }
            } else {
                let ContentComponent = tabContent[menu.propertyId];
                return prevState.concat([
                    {
                        title: menu.propertyName,
                        pathname: location.pathname,
                        key: menu.propertyId.toString(),
                        content: ContentComponent && <ContentComponent />,
                    },
                ]);
            }
        });
    }, [location, menuDataList]);

    useEffect(() => {
        if (!selectedMenu) {
            return;
        }
        setActiveTabKey(selectedMenu.propertyId.toString());
        const selectedSideMenuKeys = [].concat(
            selectedMenu.propertyId.toString()
        );
        const list = getParentsKeysByList(
            menuDataList,
            selectedMenu.propertyId,
            sideMenu.openKeys
        );
        dispatch(setSelectedSideMenuKeys(selectedSideMenuKeys));
        if (!sideMenu.collapsed) {
            dispatch(setOpenSideMenuKeys(list));
        }
    }, [selectedMenu]);

    useEffect(() => {
        const menu = getMenuDataById(menuDataList, activeTabKey);
        if (!menu) {
            return;
        }
        navigate(menu.pathname);
    }, [activeTabKey]);

    const changeHandler = (activeTabKey) => {
        setActiveTabKey(activeTabKey);
    };

    const actionsObj = {
        remove: (targetKey) => {
            let newActiveKey = activeTabKey;
            let lastIndex;
            panes.forEach((pane, i) => {
                if (pane.key === targetKey) {
                    lastIndex = i - 1;
                }
            });
            const newPanes = panes.filter((pane) => pane.key !== targetKey);
            if (newPanes.length && newActiveKey === targetKey) {
                if (lastIndex >= 0) {
                    newActiveKey = newPanes[lastIndex].key;
                } else {
                    newActiveKey = newPanes[0].key;
                }
            }
            setPanes(newPanes);
            setActiveTabKey(newActiveKey);
        },
    };

    const editHandler = (targetKey, action) => {
        if (action === "remove" && panes.length === 2) {
            const lastTab = panes.find((pane) => {
                return pane.key.toString() !== targetKey.toString();
            });
            lastTab.closable = false;
            setPanes(lastTab);
        }
        if (action === "remove" && panes.length === 1) {
            return;
        }
        actionsObj[action](targetKey);
    };
    return (
        <Tabs
            className="app-tabs"
            hideAdd
            type="editable-card"
            tabBarGutter={0}
            onChange={changeHandler}
            onEdit={editHandler}
            activeKey={activeTabKey}
        >
            {panes.length > 0 &&
                panes.map((pane, i) => (
                    <TabPane
                        tab={pane.title}
                        key={pane.key}
                        closable={pane.closable}
                    >
                        {pane.content}
                    </TabPane>
                ))}
        </Tabs>
    );
};

export default AppViews;
