import { Form, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";

import RoleForm from "./RoleForm";
import { unmapRoleProperties } from "../../../../utils/view-utils/role-management";
import roleService from "../../../../services/role-service";
import { setRoles } from "../../../../redux/slices/role-slice";

const RoleModal = (props) => {
    const { modalOpen, setModalOpen } = props;
    const [form] = Form.useForm();
    const roles = useSelector((state) => state.roleManagement.roles);
    const dispatch = useDispatch();
    const submitHandler = async () => {
        const params = form.getFieldsValue(["roleCode", "roleName"]);
        const body = unmapRoleProperties(params);
        const result = await roleService.createRole(body);
        if (result && result.success) {
            alert(result.response.message);
            setModalOpen(false);
            // TODO: response에 신규 objectId 포함되었을 경우 그리드에 반영하기
            if (result.response.objectId) {
                reflectNewData(Object.assign(params, { objectId }));
            }
        }
    };
    const reflectNewData = (params) => {
        dispatch(setRoles([params, ...roles]));
    };
    return (
        <Modal
            title="신규역할"
            visible={modalOpen}
            okText="확인"
            cancelText="취소"
            onOk={submitHandler}
            onCancel={() => setModalOpen(false)}
        >
            <RoleForm form={form} isNewRole={true} />
        </Modal>
    );
};

export default RoleModal;
