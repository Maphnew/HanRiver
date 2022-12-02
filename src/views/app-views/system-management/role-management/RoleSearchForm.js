import { Button, Card, Col, Form, Input, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import utils from "../../../../utils";
import roleService from "../../../../services/role-service";

const RoleSearchForm = (props) => {
    const { form, roleMap, setMappedRoles } = props;
    const submitHandler = async (formFields) => {
        const args = utils.buildMqlQuery(roleMap, formFields);
        if (args.mql.length !== 0) {
            const roles = await roleService.searchRole(args);
            if (roles && roles.success) {
                setMappedRoles(roles.response);
            }
        } else {
            const roles = await roleService.getAllRoles();
            if (roles && roles.success) {
                setMappedRoles(roles.response);
            }
        }
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
                name="roleSearchForm"
                onFinish={submitHandler}
                size="small"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                autoComplete="off"
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={6}>
                        <Form.Item label="역할명" name="roleName">
                            <Input placeholder="역할명" allowClear />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={16}
                        xl={18}
                        xxl={18}
                        style={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                        }}
                    >
                        <Button type="primary" icon={<SearchOutlined />} children={"Search"} htmlType="submit" />
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default RoleSearchForm;
