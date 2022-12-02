import fetch from "../../auth/fetch-interceptor";

const messageService = {};

messageService.getMessage = (params) => {
    return fetch({
        url: `/meta/admin/message/message/${params.msgLang}/${params.msgCode}`,
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    }).catch((error) => {
        console.log(error);
    });
};

messageService.searchMessages = (params) => {
    return fetch({
        url: "/meta/admin/message/search",
        method: "GET",
        headers: {
            Accept: "application/json",
        },
        params,
    }).catch((error) => {
        console.log(error);
    });
};

messageService.createMessage = (body) => {
    return fetch({
        url: "/meta/admin/message/message",
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        data: body,
    }).catch((error) => {
        console.log(error);
    });
};

messageService.updateMessage = (body) => {
    return fetch({
        url: `/meta/admin/message/message/${body.msgLang}/${body.msgCode}`,
        method: "PUT",
        headers: {
            Accept: "application/json",
        },
        data: body,
    }).catch((error) => {
        console.log(error);
    });
};

messageService.deleteMessage = (params) => {
    return fetch({
        url: `/meta/admin/message/message/${params.msgLang}/${params.msgCode}`,
        method: "DELETE",
        headers: {
            Accept: "application/json",
        },
    }).catch((error) => {
        console.log(error);
    });
};

export default messageService;
