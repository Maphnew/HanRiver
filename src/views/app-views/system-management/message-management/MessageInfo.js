import { useState } from "react";
import { Card, Space, Button, Form } from "antd";

import MessageForm from "./MessageForm";
import SaveInfo from "../../../common-views/SaveInfo";
import messageService from "../../../../services/message-service";
import { setMessages } from "../../../../redux/slices/message-slice";
import { useDispatch, useSelector } from "react-redux";

const MessageInfo = (props) => {
    const { msgForm, msgLangOptions, saveInfoData, setSaveInfoData } = props;
    const messages = useSelector((state) => state.messageManagement.messages);
    const dispatch = useDispatch();
    const deleteMessageHandler = async () => {
        const params = msgForm.getFieldsValue(["msgCode", "msgLang"]);
        if (!params.msgCode) {
            return;
        }
        const deleteConfirm = window.confirm("삭제하시겠습니까?");
        if (!deleteConfirm) {
            return;
        }
        const result = await messageService.deleteMessage(params);
        if (result && result.success) {
            const updatedMessages = messages.filter((msg) => msg.msgCode !== params.msgCode);
            dispatch(setMessages(updatedMessages));
            msgForm.resetFields();
            setSaveInfoData({});
        }
    };
    return (
        <Card
            title="메시지정보"
            extra={
                <Space size={8}>
                    <Button type="primary" children="수정" onClick={msgForm.submit} />
                    <Button children="삭제" onClick={deleteMessageHandler} />
                </Space>
            }
            style={{ height: "100%", marginBottom: "50px" }}
        >
            <MessageForm msgForm={msgForm} msgLangOptions={msgLangOptions}>
                <SaveInfo saveInfoData={saveInfoData} />
            </MessageForm>
        </Card>
    );
};

export default MessageInfo;
