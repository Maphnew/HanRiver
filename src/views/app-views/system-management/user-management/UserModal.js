import { Form, Modal } from "antd";
import moment from "moment";
import userService from "../../../../services/user-service";
import { unmapUserProperties } from "../../../../utils/view-utils/user-management";
import UserForm from "./UserForm";

const UserModal = (props) => {
    const { modalOpen, setModalOpen, propertyMap } = props;
    const [userForm] = Form.useForm();
    const submitHandler = async () => {
        const params = userForm.getFieldsValue([
            "userFullName",
            "userName",
            "userStatus",
            "countryName",
            "email",
            "phoneNumber",
            "expireDate",
        ]);
        params.expireDate = moment(params.expireDate).format("YYYY-MM-DD");
        const body = unmapUserProperties(params);
        const result = await userService.createUser(body);
        if (result && result.success) {
            alert(result.response.message);
            setModalOpen(false);
            // TODO: reflect data to grid -> objectId 반환받아 적용 필요함.
            // reflectCreatedData();
        }
    };
    return (
        <Modal
            title={"신규 사용자"}
            visible={modalOpen}
            width="70%"
            okText="확인"
            cancelText="취소"
            onOk={submitHandler}
            onCancel={() => setModalOpen(false)}
        >
            <UserForm form={userForm} />
        </Modal>
    );
};

export default UserModal;
