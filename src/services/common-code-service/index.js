import fetch from "../../auth/fetch-interceptor";

const commonCodeService = {};

commonCodeService.getCommonCode = (params) => {
    return fetch({
        url: `/meta/admin/common-code/search/${params.groupCode}/${params.code}`,
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    }).catch((error) => {
        console.dir(error);
    });
};

commonCodeService.getAllCommonCodes = () => {
    return fetch({
        url: "/meta/admin/common-code/search",
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    }).catch((error) => {
        console.dir(error);
    });
};

commonCodeService.searchCommonCodes = (params) => {
    return fetch({
        url: "/meta/admin/common-code/search/detail",
        method: "GET",
        headers: {
            Accept: "application/json",
        },
        params,
    }).catch((error) => {
        console.log(error);
    });
};

commonCodeService.createCommonCode = (body) => {
    return fetch({
        url: "/meta/admin/common-code",
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        data: body,
    }).catch((error) => {
        console.dir(error);
    });
};

commonCodeService.updateCommonCode = (body) => {
    return fetch({
        url: `/meta/admin/common-code/${body.groupCode}/${body.code}`,
        method: "PUT",
        headers: {
            Accept: "application/json",
        },
        data: body,
    }).catch((error) => {
        console.dir(error);
    });
};

commonCodeService.deleteCommonCode = (params) => {
    return fetch({
        url: `/meta/admin/common-code/${params.groupCode}/${params.code}`,
        method: "DELETE",
        headers: {
            Accept: "application/json",
        },
    }).catch((error) => {
        console.dir(error);
    });
};

export default commonCodeService;
