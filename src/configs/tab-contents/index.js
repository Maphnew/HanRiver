import Main from "../../views/app-views/dashboard/main";
import Board from "../../views/app-views/dashboard/board";
import UserManagement from "../../views/app-views/system-management/user-management";
import RoleManagement from "../../views/app-views/system-management/role-management";
import MenuManagement from "../../views/app-views/system-management/menu-management";
import General from "../../views/app-views/system-management/setting-management/general";
import DataStandardization from "../../views/app-views/system-management/setting-management/data-standardization";
import MessageManagement from "../../views/app-views/system-management/message-management";
import CommonCodeManagement from "../../views/app-views/system-management/common-code-management";
import MetaClassManagement from "../../views/app-views/system-management/meta-class-management";

import { MENU } from "../property-id/index.ts";

const tabContent = {
    [MENU.DASHBOARD_MAIN]: Main,
    [MENU.DASHBOARD_BOARD]: Board,
    [MENU.SYSTEM_USER]: UserManagement,
    [MENU.SYSTEM_ROLE]: RoleManagement,
    [MENU.SYSTEM_MENU]: MenuManagement,
    [MENU.SYSTEM_SETTING_GENERAL]: General,
    [MENU.SYSTEM_SETTING_DATASTANDARDIZATION]: DataStandardization,
    [MENU.SYSTEM_MESSAGE]: MessageManagement,
    [MENU.SYSTEM_COMMON_CODE]: CommonCodeManagement,
    [MENU.SYSTEM_META_CLASS]: MetaClassManagement,
};

export default tabContent;
