import React from "react";
import { Row, Col, Checkbox } from "antd";

const RoleMenuTreeCheckboxGroup = (props) => {
    const { title, nodeKey } = props;
    const checkboxChangeHandler = (checkedValues) => {
        console.log("checked = ", title, nodeKey, checkedValues);
    };
    return (
        <Row style={{ width: "100%" }}>
            <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                {title}
            </Col>
            <Col
                xs={24}
                sm={24}
                md={24}
                lg={20}
                xl={20}
                style={{
                    display: "flex",
                    justifyContent: "end",
                }}
            >
                <Checkbox.Group onChange={checkboxChangeHandler}>
                    <Checkbox value={"search"}>조회</Checkbox>
                    <Checkbox value={"create"}>신규</Checkbox>
                    <Checkbox value={"update"}>수정</Checkbox>
                    <Checkbox value={"delete"}>삭제</Checkbox>
                    <Checkbox value={"upload"}>업로드</Checkbox>
                    <Checkbox value={"download"}>다운로드</Checkbox>
                </Checkbox.Group>
            </Col>
        </Row>
    );
};

export default RoleMenuTreeCheckboxGroup;
