import { createSlice } from "@reduxjs/toolkit";

export const sideMenuSlice = createSlice({
    name: "sideMenu",
    initialState: {
        collapsed: false,
        openKeys: [],
        selectedKeys: [],
        menu: [
            {
                propertyId: 7100,
                propertyName: "대시보드",
                children: [
                    {
                        propertyId: 7110,
                        propertyName: "메인",
                        pathname: "/dashboard/main",
                        parentKey: 7100,
                    },
                    // {
                    //     propertyId: 7120,
                    //     propertyName: "게시판",
                    //     pathname: "/dashboard/board",
                    //     parentKey: 7100,
                    // },
                ],
            },
            // {
            //     propertyId: 7200,
            //     propertyName: "시스템관리",
            //     children: [
            //         {
            //             propertyId: 7210,
            //             propertyName: "사용자관리",
            //             pathname: "/system-management/user-management",
            //         },
            //         {
            //             propertyId: 7220,
            //             propertyName: "역할관리",
            //             pathname: "/system-management/role-management",
            //         },
            //         {
            //             propertyId: 7230,
            //             propertyName: "메뉴관리",
            //             pathname: "/system-management/menu-management",
            //         },
            //         {
            //             propertyId: 7240,
            //             propertyName: "설정관리",
            //             children: [
            //                 {
            //                     propertyId: 7241,
            //                     propertyName: "일반",
            //                     pathname:
            //                         "/system-management/setting-management/general",
            //                 },
            //                 {
            //                     propertyId: 7242,
            //                     propertyName: "데이터표준화",
            //                     pathname:
            //                         "/system-management/setting-management/data-standardization",
            //                 },
            //             ],
            //         },
            //     ],
            // },
        ],
    },
    reducers: {
        setSideMenu: (state, action) => {
            state.menu = action.payload;
        },
        setOpenSideMenuKeys: (state, action) => {
            state.openKeys = action.payload;
        },
        setSelectedSideMenuKeys: (state, action) => {
            state.selectedKeys = action.payload;
        },
        setCollapsed: (state, action) => {
            state.collapsed = action.payload;
        },
    },
});

export const { setSideMenu, setOpenSideMenuKeys, setSelectedSideMenuKeys, setCollapsed } = sideMenuSlice.actions;

export default sideMenuSlice.reducer;
