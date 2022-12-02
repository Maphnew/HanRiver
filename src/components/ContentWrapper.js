import { useLocation } from "react-router-dom";
import { Layout, Row, Col, Space, Breadcrumb } from "antd";
import { RightOutlined } from "@ant-design/icons";

const ContentWrapper = (props) => {
    const { buttons } = props;
    let location = useLocation();
    const paths = location.pathname
        .split("/")
        .filter((path) => {
            return path !== "";
        })
        .map((path) => {
            return path.toLocaleUpperCase();
        });
    return (
        <Layout className="app-layout">
            <Row
                gutter={[16, 16]}
                style={{
                    alignItems: "center",
                    paddingBottom: "5px",
                }}
            >
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Breadcrumb separator={<RightOutlined />}>
                        {paths.map((path) => {
                            return (
                                <Breadcrumb.Item key={path}>
                                    {path}
                                </Breadcrumb.Item>
                            );
                        })}
                    </Breadcrumb>
                </Col>
                <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                >
                    <Space size={8}>{buttons}</Space>
                </Col>
            </Row>
            {props.children}
        </Layout>
    );
};

export default ContentWrapper;
