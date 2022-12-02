import { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Card, Col, Space, Button, Form } from "antd";

import PropertyGrid from "./PropertyGrid";
import PropertyForm from "./PropertyForm";
import PropertyModal from "./PropertyModal";
import propertyService from "../../../../services/property-service";

const PropertyInfo = (props) => {
    const [masterYnTrue, setMasterYnTrue] = useState(false);
    const [propertyRules, setPropertyRules] = useState([]);
    const [propertyModalVisible, setPropertyModalVisible] = useState(false);
    const [form] = Form.useForm();
    const selectedClass = useSelector((state) => state.metaClassManagement.selectedClass);
    const openPropertyModal = () => {
        if (!selectedClass) {
            alert("CLASS를 선택해 주세요.");
            return;
        }
        setPropertyModalVisible(true);
    };
    const rowClickHandler = async (params) => {
        const property = await propertyService.getProperty(params.data.propertyId);
        if (!(property && property.success)) {
            return;
        }
        const {
            columnName,
            masterYn,
            propertyFormat,
            propertyId,
            propertyName,
            propertyRules,
            propertySeq,
            propertyType,
            searchDefYn,
            searchReqYn,
            msgCode,
            requiredYn,
        } = property.response;
        const conditionCheckboxGroup = [];
        if (masterYn === "Y") {
            conditionCheckboxGroup.push("masterYn");
            setMasterYnTrue(true);
        } else {
            setMasterYnTrue(false);
        }
        if (searchReqYn === "Y") {
            conditionCheckboxGroup.push("searchReqYn");
        }
        if (searchDefYn === "Y") {
            conditionCheckboxGroup.push("searchDefYn");
        }
        if (requiredYn === "Y") {
            conditionCheckboxGroup.push("requiredYn");
        }
        form.setFieldsValue({
            columnName,
            conditionCheckboxGroup,
            propertyFormat,
            propertyId,
            propertyName,
            propertySeq,
            propertyType,
            msgCode,
        });
        setPropertyRules(propertyRules);
    };
    return (
        <Card
            size="small"
            title="Property 정보"
            style={{
                height: "100%",
                borderTop: "2px solid #ee8a1b",
            }}
            extra={
                <Space size={8}>
                    <Button type="primary" onClick={openPropertyModal} children="신규" />
                    <Button onClick={form.submit} children="저장" />
                </Space>
            }
        >
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <PropertyGrid rowClickHandler={rowClickHandler} />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <PropertyForm
                        form={form}
                        masterYnTrue={masterYnTrue}
                        propertyRules={propertyRules}
                        setPropertyRules={setPropertyRules}
                    />
                </Col>
            </Row>
            <PropertyModal visible={propertyModalVisible} setVisible={setPropertyModalVisible} />
        </Card>
    );
};

export default PropertyInfo;
