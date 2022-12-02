import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import userService from "../../../../services/user-service";
import { unmapUserProperties } from "../../../../utils/view-utils/user-management";
import { setUsers } from "../../../../redux/slices/user-slice";

const { Option } = Select;

const UserForm = (props) => {
    const { form } = props;
    const users = useSelector((state) => state.userManagement.users);
    const selectedUserObjectId = useSelector((state) => state.userManagement.selectedUserObjectId);
    const dispatch = useDispatch();
    const submitHandler = async (formFields) => {
        const body = unmapUserProperties(formFields);
        body.objectId = selectedUserObjectId;
        formFields.objectId = selectedUserObjectId;

        const result = await userService.updateUser(body);
        if (result && result.success) {
            alert(result.response.message);
            reflectUpdatedData(formFields);
        }
    };
    const reflectUpdatedData = (formFields) => {
        const userIndex = users.findIndex((user) => {
            return user.objectId === formFields.objectId;
        });
        const result = [...users];
        formFields.expireDate = moment(formFields.expireDate).format("YYYY-MM-DD");
        result[userIndex] = formFields;
        dispatch(setUsers(result));
    };
    return (
        <Form form={form} name="userForm" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={submitHandler}>
            <Row gutter={[16, 8]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={8}>
                    <Form.Item label="사용자전체명" name="userFullName">
                        <Input placeholder="사용자전체명" allowClear />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={8}>
                    <Form.Item label="사용자명" name="userName">
                        <Input placeholder="사용자명" allowClear />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={8}>
                    <Form.Item label="사용자상태" name="userStatus" initialValue="Y">
                        <Select>
                            <Option value="Y">사용</Option>
                            <Option value="N">미사용</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={8}>
                    <Form.Item label="국가명" name="countryName" initialValue="korea">
                        <Select>
                            <Option value="korea">대한민국</Option>
                            <Option value="usa">미국</Option>
                            <Option value="somalia">소말리아</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={8}>
                    <Form.Item label="e-mail" name="email">
                        <Input placeholder="example@example.com" allowClear />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={8}>
                    <Form.Item label="전화번호" name="phoneNumber">
                        <Input placeholder="000-0000-0000" allowClear />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={8}>
                    <Form.Item label="만료일자" name="expireDate">
                        <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={16} xxl={16}></Col>
                {props.children}
            </Row>
        </Form>
    );
};

export default UserForm;
