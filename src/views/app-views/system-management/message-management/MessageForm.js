import { Form, Row, Col, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../../../redux/slices/message-slice";

import messageService from "../../../../services/message-service";

const { Option } = Select;

const MessageForm = (props) => {
    const { msgForm, isNewMessageModal, msgLangOptions, setModalOpen } = props;
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.messageManagement.messages);
    const submitHandler = async (formFields) => {
        const body = {
            ...formFields,
            msgType: "testType",
        };

        if (isNewMessageModal) {
            const result = await messageService.createMessage(body);
            if (result && result.success) {
                alert(result.response.message);
                setModalOpen(false);
            } else {
                return;
            }
        } else {
            const result = await messageService.updateMessage(body);
            if (result && result.success) {
                alert(result.response.message);
            } else {
                return;
            }
        }
        fetchMessage({ msgLang: body.msgLang, msgCode: body.msgCode });
    };
    const fetchMessage = async (params) => {
        const message = await messageService.getMessage(params);
        if (message && message.success) {
            reflectUpdatedData(message.response);
        }
    };
    const reflectUpdatedData = (data) => {
        if (isNewMessageModal) {
            const updatedMessages = [data, ...messages];
            dispatch(setMessages(updatedMessages));
        } else {
            const msgIndex = messages.findIndex((msg) => {
                return msg.msgCode === data.msgCode;
            });
            let updatedMessages = [...messages];
            updatedMessages[msgIndex] = data;
            dispatch(setMessages(updatedMessages));
        }
    };
    return (
        <Form
            form={msgForm}
            name={"messageForm"}
            onFinish={submitHandler}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
        >
            <Row gutter={[16, 16]}>
                <Col sm={24} md={24} lg={16} xl={16}>
                    <Form.Item
                        name="msgCode"
                        tooltip={isNewMessageModal ? "" : "This is a read-only field"}
                        label="메시지코드"
                        rules={[
                            {
                                required: true,
                                message: "Please input a message code!",
                            },
                        ]}
                    >
                        <Input placeholder="메시지코드" allowClear readOnly={isNewMessageModal ? false : true} />
                    </Form.Item>
                </Col>
                <Col sm={24} md={24} lg={8} xl={8}>
                    <Form.Item
                        label="메시지국가코드"
                        name="msgLang"
                        rules={[
                            {
                                required: true,
                                message: "Please input a language code!",
                            },
                        ]}
                    >
                        <Select>
                            {msgLangOptions.map((option) => {
                                return (
                                    <Option key={option} value={option}>
                                        {option}
                                    </Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                </Col>
                <Col sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                        label="메시지내용"
                        name="msgText"
                        rules={[
                            {
                                required: true,
                                message: "Please input text!",
                            },
                        ]}
                    >
                        <Input.TextArea rows="4" allowClear />
                    </Form.Item>
                </Col>
                <Col sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                        label="메시지설명"
                        name="msgDefinition"
                        rules={[
                            {
                                required: true,
                                message: "Please input text!",
                            },
                        ]}
                    >
                        <Input.TextArea rows="4" allowClear />
                    </Form.Item>
                </Col>
                {props.children}
            </Row>
        </Form>
    );
};

export default MessageForm;
