import { Col, Form, Input, Row } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MessageCodeModal from "../../../common-views/MessageCodeModal";

import roleService from "../../../../services/role-service";
import { unmapRoleProperties } from "../../../../utils/view-utils/role-management";
import { setRoles } from "../../../../redux/slices/role-slice";

const { Search } = Input;

const RoleForm = (props) => {
    const { form, isNewRole, saveInfoData } = props;
    const [msgModalOpen, setMsgModalOpen] = useState(false);
    const roles = useSelector((state) => state.roleManagement.roles);
    const selectedRole = useSelector((state) => state.roleManagement.selectedRole);
    const dispatch = useDispatch();
    const submitHandler = async (params) => {
        const body = unmapRoleProperties(params);
        body.objectId = selectedRole.objectId;
        params.objectId = selectedRole.objectId;
        const result = await roleService.updateRole(body);
        if (result && result.success) {
            alert(result.response.message);
            reflectUpdatedData(params);
        }
    };
    const reflectUpdatedData = (data) => {
        const roleIndex = roles.findIndex((role) => {
            return role.objectId === data.objectId;
        });
        const result = [...roles];
        result[roleIndex] = data;
        dispatch(setRoles(result));
    };
    const msgCodeSearchModalOpen = () => {
        setMsgModalOpen(true);
    };
    return (
        <Form form={form} name="roleForm" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={submitHandler}>
            <Row gutter={[16, 8]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                    <Form.Item label="역할명" name="roleCode">
                        <Search
                            placeholder="역할명"
                            onClick={msgCodeSearchModalOpen}
                            onSearch={msgCodeSearchModalOpen}
                            autoComplete="off"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                    <Form.Item label="역할설명" name="roleName">
                        <Input placeholder="역할설명" />
                    </Form.Item>
                </Col>
                {!isNewRole && (
                    <>
                        <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
                            <Form.Item label="생성일자">
                                <Input placeholder="생성일자" value={saveInfoData.createDt} readOnly />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
                            <Form.Item label="생성자">
                                <Input placeholder="생성자" value={saveInfoData.cusrId} readOnly />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
                            <Form.Item label="수정일자">
                                <Input placeholder="수정일자" value={saveInfoData.modifyDt} readOnly />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
                            <Form.Item label="수정자">
                                <Input placeholder="수정자" value={saveInfoData.musrId} readOnly />
                            </Form.Item>
                        </Col>
                    </>
                )}
            </Row>
            {props.children}
            <MessageCodeModal form={form} visible={msgModalOpen} setVisible={setMsgModalOpen} fieldName={"roleCode"} />
        </Form>
    );
};

export default RoleForm;
