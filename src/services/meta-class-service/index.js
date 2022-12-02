import fetch from "../../auth/fetch-interceptor";

const metaClassService = {};

metaClassService.getAllMetaClasses = () => {
    return fetch({
        url: "/meta/admin/meta-class/search",
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    }).catch((error) => {
        console.dir(error);
    });
};

metaClassService.getMetaClass = (className) => {
    return fetch({
        url: "/meta/admin/meta-class/search/detail",
        method: "GET",
        headers: {
            Accept: "application/json",
        },
        params: {
            className,
        },
    }).catch((error) => {
        console.dir(error);
    });
};

metaClassService.getProperties = (classId) => {
    return fetch({
        url: `/meta/admin/meta-class/${classId}/property`,
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    }).catch((error) => {
        console.dir(error);
    });
};

metaClassService.createMetaClass = (body) => {
    const { classId, className, containerClassId, classTypeName } = body;
    return fetch({
        url: "/meta/admin/meta-class/code",
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        data: {
            classId,
            className,
            containerClassId: containerClassId ? containerClassId : 1000, // 임시, 외부모듈 키
            classTypeName,
        },
    }).catch((error) => {
        console.dir(error);
    });
};

metaClassService.updateMetaClass = (body) => {
    const { classId, className, containerClassId, classTypeName } = body;
    return fetch({
        url: `/meta/admin/meta-class/code/${classId}`,
        method: "PUT",
        headers: {
            Accept: "application/json",
        },
        data: {
            classId,
            className,
            containerClassId,
            classTypeName,
        },
    }).catch((error) => {
        console.dir(error);
    });
};

metaClassService.deleteMetaClass = (classId) => {
    return fetch({
        url: `/meta/admin/meta-class/code/${classId}`,
        method: "DELETE",
        headers: {
            Accept: "application/json",
        },
    }).catch((error) => {
        console.dir(error);
    });
};

export default metaClassService;
