import fetch from "../../auth/fetch-interceptor";

const propertyService = {};

propertyService.getProperty = (propertyId) => {
    return fetch({
        url: `/meta/admin/property/${propertyId}`,
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    }).catch((error) => {
        console.dir(error);
    });
};

propertyService.updateProperty = (body) => {
    const {
        metaClass,
        propertyName,
        propertyType,
        columnName,
        propertyFormat,
        propertySeq,
        masterYn,
        searchReqYn,
        searchDefYn,
        propertyRuleDtoList,
    } = body;
    return fetch({
        url: `/meta/admin/property/${body.propertyId}`,
        method: "PUT",
        headers: {
            Accept: "application/json",
        },
        data: {
            metaClass,
            propertyName,
            propertyType,
            columnName,
            propertyFormat,
            propertySeq,
            masterYn,
            searchReqYn,
            searchDefYn,
            propertyRuleDtoList,
        },
    }).catch((error) => {
        console.dir(error);
    });
};

propertyService.createProperty = (body) => {
    const {
        metaClass,
        propertyName,
        propertyType,
        columnName,
        propertyFormat,
        propertySeq,
        masterYn,
        searchReqYn,
        searchDefYn,
        propertyRuleDtoList,
    } = body;
    return fetch({
        url: "/meta/admin/property",
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        data: {
            metaClass,
            propertyName,
            propertyType,
            columnName,
            propertyFormat,
            propertySeq,
            masterYn,
            searchReqYn,
            searchDefYn,
            propertyRuleDtoList,
        },
    }).catch((error) => {
        console.dir(error);
    });
};

propertyService.deleteProperty = (propertyId) => {
    return fetch({
        url: `/meta/admin/property/${propertyId}`,
        method: "DELETE",
        headers: {
            Accept: "application/json",
        },
    }).catch((error) => {
        console.dir(error);
    });
};

export default propertyService;
