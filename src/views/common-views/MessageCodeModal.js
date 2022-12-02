import { Col, Input, Modal, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import MessageCodeModalGrid from "./MessageCodeModalGrid";
import utils from "../../utils";

const MessageCodeModal = (props) => {
    const { form, visible, setVisible, fieldName } = props;
    const [messageData, setMessageData] = useState([]);
    const [list, setList] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const inputRef = useRef(null);
    const messages = useSelector((state) => state.messageManagement.messages);

    useEffect(() => {
        if (!visible) {
            return;
        }
        setList(messages);
        inputRef.current.focus();
    }, [visible]);

    const handleOk = () => {
        if (!selectedRow) {
            return;
        }
        form.setFieldsValue({
            [fieldName]: selectedRow.data.msgCode,
        });
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    const inputChangeHandler = (e) => {
        const value = e.currentTarget.value;
        const data = utils.wildCardSearch(messages, value);
        setList(data);
    };
    const rowClickHandler = (params) => {
        setSelectedRow(params);
    };
    const gridReadyHandler = (params) => {
        params.api.sizeColumnsToFit();
    };
    return (
        <Modal
            title="메시지코드"
            visible={visible}
            okText="확인"
            cancelText="취소"
            onOk={handleOk}
            onCancel={handleCancel}
            width="80%"
        >
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Input
                        ref={inputRef}
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                        onChange={inputChangeHandler}
                        allowClear
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <MessageCodeModalGrid
                        rowData={list}
                        pagination={false}
                        rowClickHandler={rowClickHandler}
                        gridReadyHandler={gridReadyHandler}
                        modalHandleOk={handleOk}
                    />
                </Col>
            </Row>
        </Modal>
    );
};

export default MessageCodeModal;
