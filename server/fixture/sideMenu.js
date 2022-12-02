const sideMenu = [
    {
        propertyId: 7100,
        propertyName: "대시보드",
        children: [
            {
                propertyId: 7110,
                propertyName: "메인",
                pathname: "/dashboard/main",
                parentId: 7100,
            },
            {
                propertyId: 7120,
                propertyName: "게시판",
                pathname: "/dashboard/board",
                parentId: 7100,
            },
        ],
    },
    {
        propertyId: 7200,
        propertyName: "시스템관리",
        children: [
            {
                propertyId: 7210,
                propertyName: "사용자관리",
                pathname: "/system-management/user-management",
                parentId: 7200,
            },
            {
                propertyId: 7220,
                propertyName: "역할관리",
                pathname: "/system-management/role-management",
                parentId: 7200,
            },
            {
                propertyId: 7230,
                propertyName: "메뉴관리",
                pathname: "/system-management/menu-management",
                parentId: 7200,
            },
            {
                propertyId: 7240,
                propertyName: "설정관리",
                parentId: 7200,
                children: [
                    {
                        propertyId: 7241,
                        propertyName: "일반",
                        pathname:
                            "/system-management/setting-management/general",
                        parentId: 7240,
                    },
                    {
                        propertyId: 7242,
                        propertyName: "데이터표준화",
                        pathname:
                            "/system-management/setting-management/data-standardization",
                        parentId: 7240,
                    },
                ],
            },
            {
                propertyId: 7250,
                propertyName: "메시지관리",
                pathname: "/system-management/message-management",
                parentId: 7200,
            },
            {
                propertyId: 7260,
                propertyName: "공통코드관리",
                pathname: "/system-management/common-code-management",
                parentId: 7200,
            },
            {
                propertyId: 7270,
                propertyName: "메타클래스관리",
                pathname: "/system-management/meta-class-management",
                parentId: 7200,
            },
        ],
    },
];

module.exports = sideMenu;
