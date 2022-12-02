import { Button, Col, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import ContentWrapper from "../../../../components/ContentWrapper";
import MenuTree from "./MenuTree";
import MenuInfo from "./MenuInfo";

const MenuManagement = () => {
    const [componentHeight, setComponentHeight] = useState(0);
    const treeCardRef = useRef(null);
    useEffect(() => {
        setComponentHeight(treeCardRef.current.clientHeight);
    }, []);
    const createMenuHandler = () => {
        console.log("create!");
    };
    const refreshHandler = () => {
        console.log("refresh!");
    };
    return (
        <ContentWrapper
            buttons={
                <>
                    <Button icon={<PlusOutlined />} type="link" children={"메뉴생성"} onClick={createMenuHandler} />
                    <Button icon={<ReloadOutlined />} type="text" children={"초기화"} onClick={refreshHandler} />
                </>
            }
        >
            <Row gutter={[16, 16]} style={{ height: "100%" }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                    <MenuTree ref={treeCardRef} componentHeight={componentHeight} />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={16}>
                    <MenuInfo />
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default MenuManagement;
