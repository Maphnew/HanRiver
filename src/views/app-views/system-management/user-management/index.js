import { Button, Col, Form, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import ContentWrapper from "../../../../components/ContentWrapper";
import UserGrid from "./UserGrid";
import UserInfo from "./UserInfo";
import UserModal from "./UserModal";
import UserSearchForm from "./UserSearchForm";

import userService from "../../../../services/user-service";
import { mapUserProperties, unmapUserProperties, matchDataToMap } from "../../../../utils/view-utils/user-management";
import { setUsers } from "../../../../redux/slices/user-slice";

const UserManagement = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [propertyMap, setPropertyMap] = useState({});
    const [saveInfoData, setSaveInfoData] = useState({});
    const [gridApi, setGridApi] = useState(null);
    const [userForm] = Form.useForm();
    const dispatch = useDispatch();

    const setMappedUsers = (userObjects) => {
        const users = userObjects.map((userObject) => {
            return matchDataToMap(propertyMap, userObject);
        });
        dispatch(setUsers(users));
    };

    useEffect(() => {
        const fetchUserPropertyMap = async () => {
            const userClassDefinition = await userService.getUserClassDefinition();
            if (userClassDefinition && userClassDefinition.success) {
                const propertyObject = mapUserProperties(userClassDefinition.response.mclassPropertyList);
                setPropertyMap(propertyObject);
            }
        };
        fetchUserPropertyMap();
    }, []);

    useEffect(() => {
        if (Object.keys(propertyMap).length === 0) {
            return;
        }
        const fetchUsers = async () => {
            const userObjects = await userService.getAllUsers();
            if (userObjects && userObjects.success) {
                const users = userObjects.response.map((userObjects) => {
                    return matchDataToMap(propertyMap, userObjects);
                });
                dispatch(setUsers(users));
            }
        };
        fetchUsers();
    }, [propertyMap]);

    return (
        <ContentWrapper
            buttons={
                <>
                    <Button type="link" children={"신규"} onClick={() => setModalOpen(true)} />
                    <Button type="link" children={"CSV"} onClick={() => gridApi.exportDataAsCsv()} />
                </>
            }
        >
            <Row gutter={[16, 16]} style={{ paddingBottom: "16px" }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <UserSearchForm setMappedUsers={setMappedUsers} propertyMap={propertyMap} />
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ height: "100%" }}>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                    <UserGrid form={userForm} setGridApi={setGridApi} setSaveInfoData={setSaveInfoData} />
                </Col>
                <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                    <UserInfo form={userForm} saveInfoData={saveInfoData} />
                </Col>
            </Row>
            <UserModal modalOpen={modalOpen} setModalOpen={setModalOpen} propertyMap={propertyMap} />
        </ContentWrapper>
    );
};

export default UserManagement;
