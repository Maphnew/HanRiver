import { Button, Card } from "antd";
import RoleForm from "./RoleForm";
import RoleMenuTree from "./RoleMenuTree";

const RoleInfo = (props) => {
    const { form, saveInfoData } = props;
    return (
        <Card
            title="역할정보"
            extra={<Button type="primary" onClick={form.submit} children={"저장"} />}
            style={{ height: "100%", marginBottom: "50px" }}
        >
            <RoleForm form={form} saveInfoData={saveInfoData}>
                <RoleMenuTree />
            </RoleForm>
        </Card>
    );
};

export default RoleInfo;
