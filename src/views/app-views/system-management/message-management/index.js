import { useState } from "react";
import { Row, Col, Card, Form, Button, Space, Modal } from "antd";
import { AgGridReact } from "ag-grid-react";

import ContentWrapper from "../../../../components/ContentWrapper";
import MessageSearchForm from "./MessageSearchForm";
import MessageGrid from "./MessageGrid";
import MessageInfo from "./MessageInfo";
import MessageModal from "./MessageModal";

const msgLangOptions = ["KR", "EN", "JP", "CH"];

const MessageManagement = (props) => {
    const [saveInfoData, setSaveInfoData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [gridApi, setGridApi] = useState(null);
    const [msgInfoForm] = Form.useForm();
    const rowClickHandler = (params) => {
        msgInfoForm.setFieldsValue({
            msgCode: params.data.msgCode,
            msgLang: params.data.msgLang,
            msgText: params.data.msgText,
            msgDefinition: params.data.msgDefinition,
        });
        setSaveInfoData({
            createDt: params.data.createDt ?? "",
            cusrId: params.data.cusrId ?? "",
            modifyDt: params.data.modifyDt ?? "",
            musrId: params.data.musrId ?? "",
        });
    };
    const gridReadyHandler = (params) => {
        setGridApi(params.api);
        params.api.sizeColumnsToFit();
    };
    return (
        <ContentWrapper
            buttons={
                <>
                    <Button type="link" children={"신규"} onClick={() => setModalOpen(true)} />
                    <Button type="link" children={"CSV"} onClick={() => gridApi.exportDataAsCsv()} />
                </>
            }
        >
            <Row gutter={[16, 16]} style={{ paddingBottom: "16px" }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <MessageSearchForm msgLangOptions={msgLangOptions} />
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ height: "100%" }}>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                    <MessageGrid rowClickHandler={rowClickHandler} gridReadyHandler={gridReadyHandler} />
                </Col>
                <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                    <MessageInfo
                        msgForm={msgInfoForm}
                        msgLangOptions={msgLangOptions}
                        saveInfoData={saveInfoData}
                        setSaveInfoData={setSaveInfoData}
                    />
                </Col>
            </Row>
            <MessageModal modalOpen={modalOpen} setModalOpen={setModalOpen} msgLangOptions={msgLangOptions} />
        </ContentWrapper>
    );
};

export default MessageManagement;
