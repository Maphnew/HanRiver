import { Button, Card, Form } from "antd";
import SaveInfo from "../../../common-views/SaveInfo";
import UserForm from "./UserForm";
import UserRoleGrid from "./UserRoleGrid";

const UserInfo = (props) => {
    const { form, saveInfoData } = props;
    return (
        <Card
            title="사용자정보"
            extra={<Button type="primary" children={"저장"} onClick={form.submit} />}
            style={{ height: "95%", marginBottom: "50px" }}
        >
            <UserForm form={form}>
                <SaveInfo saveInfoData={saveInfoData} />
                <UserRoleGrid />
            </UserForm>
        </Card>
    );
};

export default UserInfo;
