import fetch from "../../auth/fetch-interceptor";
import metaClassService from "../meta-class-service";
import { ROLE_CLASS_ID } from "../../configs/class-id";

const roleService = {};

roleService.getRoleClassDefinition = () => {
    return metaClassService.getProperties(ROLE_CLASS_ID);
};

roleService.getAllRoles = () => {
    return fetch({
        url: "/meta/admin/role/searchAll",
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    }).catch((error) => {
        console.dir(error);
    });
};

roleService.searchRole = (params) => {
    return fetch({
        url: `/meta/admin/role/search`,
        method: "GET",
        headers: {
            Accept: "application/json",
        },
        params,
    }).catch((error) => {
        console.dir(error);
    });
};

roleService.getRole = (objectId) => {
    return fetch({
        url: `/meta/admin/role/search/${objectId}`,
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    }).catch((error) => {
        console.dir(error);
    });
};

roleService.createRole = (body) => {
    return fetch({
        url: `/meta/admin/role/role`,
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        data: body,
    }).catch((error) => {
        console.dir(error);
    });
};

roleService.updateRole = (body) => {
    return fetch({
        url: `/meta/admin/role/role/${body.objectId}`,
        method: "PUT",
        headers: {
            Accept: "application/json",
        },
        data: body,
    }).catch((error) => {
        console.dir(error);
    });
};

roleService.deleteRole = (objectId) => {
    return fetch({
        url: `/meta/admin/role/role/${objectId}`,
        method: "DELETE",
        headers: {
            Accept: "application/json",
        },
    }).catch((error) => {
        console.dir(error);
    });
};

export default roleService;
