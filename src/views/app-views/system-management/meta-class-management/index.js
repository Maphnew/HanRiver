import { useState } from "react";
import { Col, Row, Card, Button, Space, Form } from "antd";
import ContentWrapper from "../../../../components/ContentWrapper";
import ClassSearchForm from "./ClassSearchForm";
import ClassGrid from "./ClassGrid";
import ClassModal from "./ClassModal";
import PropertyInfo from "./PropertyInfo";
import PropertyModal from "./PropertyModal";

const MetaClassManagement = (props) => {
    const [classModalVisible, setClassModalVisible] = useState(false);
    const openClassModal = () => {
        setClassModalVisible(true);
    };
    return (
        <ContentWrapper buttons={<Button type="link" children="신규" onClick={openClassModal} />}>
            <Row gutter={[16, 16]} style={{ height: "100%" }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                        <Card
                            size="small"
                            style={{
                                marginBottom: "16px",
                                borderTop: "2px solid #ee8a1b",
                            }}
                        >
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <ClassSearchForm />
                                </Col>
                            </Row>
                        </Card>
                        <ClassGrid />
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={16}>
                    <PropertyInfo />
                </Col>
            </Row>
            <ClassModal visible={classModalVisible} setVisible={setClassModalVisible} />
        </ContentWrapper>
    );
};

export default MetaClassManagement;
