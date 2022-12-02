import fetch from "../../auth/fetch-interceptor";
import metaClassService from "../meta-class-service";
import { USER_CLASS_ID } from "../../configs/class-id";

const userService = {};

userService.getUserClassDefinition = () => {
    return metaClassService.getProperties(USER_CLASS_ID);
};

userService.getAllUsers = () => {
    return fetch({
        url: "/meta/admin/userManagement/search",
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    }).catch((error) => {
        console.dir(error);
    });
};

userService.searchUser = (params) => {
    return fetch({
        url: "/meta/admin/userManagement/search/detail",
        method: "GET",
        headers: {
            Accept: "application/json",
        },
        params,
    }).catch((error) => {
        console.dir(error);
    });
};

userService.getUser = (objectId) => {
    return fetch({
        url: `/meta/admin/userManagement/search/detail/${objectId}`,
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    }).catch((error) => {
        console.dir(error);
    });
};

userService.createUser = (body) => {
    return fetch({
        url: `/meta/admin/userManagement/user`,
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        data: body,
    }).catch((error) => {
        console.dir(error);
    });
};

userService.updateUser = (body) => {
    return fetch({
        url: `/meta/admin/userManagement/user/${body.objectId}`,
        method: "PUT",
        headers: {
            Accept: "application/json",
        },
        data: body,
    }).catch((error) => {
        console.dir(error);
    });
};

userService.deleteUser = (objectId) => {
    return fetch({
        url: `/meta/admin/userManagement/user/${objectId}`,
        method: "DELETE",
        headers: {
            Accept: "application/json",
        },
    }).catch((error) => {
        console.dir(error);
    });
};

export default userService;
