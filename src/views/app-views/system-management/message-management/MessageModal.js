import React from "react";
import { Modal, Form } from "antd";
import MessageForm from "./MessageForm";

const MessageModal = (props) => {
    const { modalOpen, setModalOpen, msgLangOptions } = props;
    const [msgForm] = Form.useForm();
    return (
        <Modal
            title={"신규 메시지"}
            visible={modalOpen}
            width={"70%"}
            okText="확인"
            cancelText="취소"
            onOk={msgForm.submit}
            onCancel={() => setModalOpen(false)}
        >
            <MessageForm
                msgForm={msgForm}
                isNewMessageModal={true}
                msgLangOptions={msgLangOptions}
                setModalOpen={setModalOpen}
            />
        </Modal>
    );
};

export default MessageModal;
