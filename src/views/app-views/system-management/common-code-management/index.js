import { useState } from "react";
import { Row, Col, Card, Form, Button, Space, Modal } from "antd";
import ContentWrapper from "../../../../components/ContentWrapper";
import CommonCodeSearchForm from "./CommonCodeSearchForm";
import CommonCodeGrid from "./CommonCodeGrid";
import CommonCodeInfo from "./CommonCodeInfo";
import CommonCodeModal from "./CommonCodeModal";

const CommonCodeManagement = (props) => {
    const [saveInfoData, setSaveInfoData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [gridApi, setGridApi] = useState(null);
    const [codeInfoForm] = Form.useForm();

    const rowClickHandler = (params) => {
        const {
            groupCode,
            groupCodeName,
            code,
            codeName,
            codeDescription,
            codeSeq,
            cusrId,
            createDt,
            musrId,
            modifyDt,
        } = params.data;

        codeInfoForm.setFieldsValue({
            groupCode,
            groupCodeName,
            code,
            codeName,
            codeDescription,
            codeSeq,
            cusrId,
            createDt,
            musrId,
            modifyDt,
        });

        setSaveInfoData({
            cusrId,
            createDt,
            musrId,
            modifyDt,
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
                    <CommonCodeSearchForm />
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ height: "100%" }}>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                    <CommonCodeGrid rowClickHandler={rowClickHandler} gridReadyHandler={gridReadyHandler} />
                </Col>
                <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                    <CommonCodeInfo
                        codeInfoForm={codeInfoForm}
                        saveInfoData={saveInfoData}
                        setSaveInfoData={setSaveInfoData}
                    />
                </Col>
            </Row>
            <CommonCodeModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </ContentWrapper>
    );
};

export default CommonCodeManagement;
