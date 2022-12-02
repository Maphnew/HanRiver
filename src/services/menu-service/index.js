import fetch from "../../auth/fetch-interceptor";
import metaClassService from "../../services/meta-class-service";
import { MENU_CLASS_ID } from "../../configs/class-id";

const menuService = {};

menuService.getMenuClassDefinition = () => {
    return metaClassService.getProperties(MENU_CLASS_ID);
};

export default menuService;
