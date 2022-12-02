import { Col, Form, Input, Row, Select } from "antd";

const { Option } = Select;

const classTypeOptions = ["Object", "ObjectRelation", "ObjectLog", "TempObject"];

const ClassForm = (props) => {
    const { form, submitHandler } = props;
    return (
        <Form
            form={form}
            name="newClassForm"
            onFinish={submitHandler}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
        >
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                        name="classId"
                        label="CLASSID"
                        rules={[
                            {
                                required: true,
                                message: "Please input a class id!",
                            },
                        ]}
                    >
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                        name="className"
                        label="CLASS명"
                        rules={[
                            {
                                required: true,
                                message: "Please input a class name!",
                            },
                        ]}
                    >
                        <Input type="text" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item name="classTypeName" label="CLASS 종류" initialValue="Object">
                        <Select style={{ width: "100%" }}>
                            {classTypeOptions.map((option) => {
                                return <Option key={option} value={option} children={option} />;
                            })}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default ClassForm;
