import { Col, Popover, Row } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const nodeMenuComponent = (title, nodeKey, createNode) => {
    return (
        <div>
            <p style={{ cursor: "pointer" }} onClick={() => createNode(`생성 ${title}, ${nodeKey}`)}>
                생성
            </p>
            <p style={{ cursor: "pointer" }} onClick={() => createNode(`삭제 ${title}, ${nodeKey}`)}>
                삭제
            </p>
            <p style={{ cursor: "pointer" }} onClick={() => createNode(`잘라내기 ${title}, ${nodeKey}`)}>
                잘라내기
            </p>
            <p style={{ cursor: "pointer" }} onClick={() => createNode(`붙여넣기 ${title}, ${nodeKey}`)}>
                붙여넣기
            </p>
        </div>
    );
};

const MenuTreeNode = (props) => {
    const { title, nodeKey, createNode } = props;
    return (
        <Row>
            <Col xs={24} sm={24} md={24} lg={20} xl={20}>
                {title}
            </Col>
            <Col
                xs={24}
                sm={24}
                md={24}
                lg={4}
                xl={4}
                style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                }}
            >
                <Popover
                    placement="rightTop"
                    title={title}
                    content={nodeMenuComponent(title, nodeKey, createNode)}
                    trigger="click"
                >
                    <MoreOutlined />
                </Popover>
            </Col>
        </Row>
    );
};

export default MenuTreeNode;
