import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import ContentWrapper from "../../../../components/ContentWrapper";
import RoleGrid from "./RoleGrid";
import RoleInfo from "./RoleInfo";
import RoleModal from "./RoleModal";
import RoleSearchForm from "./RoleSearchForm";

import { mapRoleProperties, matchDataToMap } from "../../../../utils/view-utils/role-management";
import roleService from "../../../../services/role-service";
import { setRoles } from "../../../../redux/slices/role-slice";

const RoleManagement = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [roleMap, setRoleMap] = useState({});
    const [saveInfoData, setSaveInfoData] = useState({});
    const [searchForm] = Form.useForm();
    const [roleForm] = Form.useForm();
    const [gridApi, setGridApi] = useState(null);
    const roles = useSelector((state) => state.roleManagement.roles);
    const selectedRole = useSelector((state) => state.roleManagement.selectedRole);
    const dispatch = useDispatch();
    // TODO: Delete API 정상작동 테스트 필요 (현재 오류발생)
    const deleteHandler = async () => {
        const result = await roleService.deleteRole(selectedRole.objectId);
        if (result && result.success) {
            alert(result.response.message);
            dispatch(setRoles(roles.filter((role) => role.objectId !== selectedRole.objectId)));
        }
    };

    const setMappedRoles = (roleObjects) => {
        const roles = roleObjects.map((roleObject) => {
            return matchDataToMap(roleMap, roleObject);
        });
        dispatch(setRoles(roles));
    };

    useEffect(() => {
        const fetchRoleDef = async () => {
            const roleDef = await roleService.getRoleClassDefinition();
            if (roleDef && roleDef.success) {
                const propertyObject = mapRoleProperties(roleDef.response.mclassPropertyList);
                setRoleMap(propertyObject);
            }
        };
        fetchRoleDef();
    }, []);

    useEffect(() => {
        if (Object.keys(roleMap).length === 0) {
            return;
        }
        const fetchRoles = async () => {
            const roleObjects = await roleService.getAllRoles();
            if (roleObjects && roleObjects.success) {
                const roles = roleObjects.response.map((roleObject) => {
                    return matchDataToMap(roleMap, roleObject);
                });
                dispatch(setRoles(roles));
            }
        };
        fetchRoles();
    }, [roleMap]);

    return (
        <ContentWrapper
            buttons={
                <>
                    <Button icon={<PlusOutlined />} type="link" children={"신규"} onClick={() => setModalOpen(true)} />
                    <Button icon={<MinusOutlined />} type="text" children={"삭제"} onClick={deleteHandler} />
                </>
            }
        >
            <Row gutter={[16, 16]} style={{ paddingBottom: "16px" }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <RoleSearchForm form={searchForm} roleMap={roleMap} setMappedRoles={setMappedRoles} />
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{flex:"1"}}>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                    <RoleGrid form={roleForm} setSaveInfoData={setSaveInfoData} />
                </Col>
                <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                    <RoleInfo form={roleForm} saveInfoData={saveInfoData} />
                </Col>
            </Row>
            <RoleModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </ContentWrapper>
    );
};

export default RoleManagement;
