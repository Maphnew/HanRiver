import { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Row, Col, Button, Input, Form, Space, Select, Tooltip } from "antd";
import { MinusCircleFilled, SearchOutlined, ZoomInOutlined } from "@ant-design/icons";

import messageService from "../../../../services/message-service";
import { setMessages } from "../../../../redux/slices/message-slice";

const { Option } = Select;

const MessageSearchForm = (props) => {
    const { msgLangOptions } = props;
    const [detailSearchOn, setDetailSearchOn] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const submitHandler = async (formFields) => {
        const params = { ...formFields };
        if (params.msgLang === "all") {
            params.msgLang = undefined;
        }
        const messages = await messageService.searchMessages(params);
        if (messages && messages.success) {
            dispatch(setMessages(messages.response));
        }
    };
    const toggleDetailSearch = () => {
        setDetailSearchOn(!detailSearchOn);
    };
    return (
        <Card
            style={{
                width: "100%",
                height: "100%",
                borderTop: "2px solid #ee8a1b",
            }}
        >
            <Form
                form={form}
                name="messageSearchForm"
                onFinish={submitHandler}
                size="small"
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                autoComplete="off"
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={21} xxl={21}>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
                                <Form.Item
                                    name="msgCode"
                                    className="detail-search"
                                    label={
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div>메시지코드</div>
                                            {detailSearchOn ? (
                                                <Tooltip placement="topLeft" title={"Detail Search"}>
                                                    <MinusCircleFilled onClick={toggleDetailSearch} />
                                                </Tooltip>
                                            ) : (
                                                <Tooltip placement="topLeft" title={"Detail Search"}>
                                                    <ZoomInOutlined
                                                        style={{
                                                            color: "#ee8a1b",
                                                        }}
                                                        onClick={toggleDetailSearch}
                                                    />
                                                </Tooltip>
                                            )}
                                        </div>
                                    }
                                >
                                    <Input placeholder="메시지코드" allowClear />
                                </Form.Item>
                            </Col>
                            {detailSearchOn && (
                                <>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
                                        <Form.Item label="메시지국가코드" name="msgLang" initialValue="all">
                                            <Select>
                                                <Option value="all">전체</Option>
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
                                    <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
                                        <Form.Item label="메시지내용" name="msgText">
                                            <Input placeholder="메시지내용" allowClear />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
                                        <Form.Item label="메시지설명" name="msgDefinition">
                                            <Input placeholder="메시지설명" allowClear />
                                        </Form.Item>
                                    </Col>
                                </>
                            )}
                        </Row>
                    </Col>
                    <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        xl={3}
                        xxl={3}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "end",
                        }}
                    >
                        <Space size={8}>
                            <Button htmlType="submit" type="primary" icon={<SearchOutlined />}>
                                Search
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default MessageSearchForm;
