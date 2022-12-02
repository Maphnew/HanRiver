import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Space } from "antd";
import SaveInfo from "../../../common-views/SaveInfo";
import CommonCodeForm from "./CommonCodeForm";

import commonCodeService from "../../../../services/common-code-service";
import { setCommonCodeData } from "../../../../redux/slices/common-code-slice";

const CommonCodeInfo = (props) => {
    const { codeInfoForm, saveInfoData, setSaveInfoData } = props;
    const commonCodeData = useSelector((state) => state.commonCodeManagement.commonCodeData);
    const dispatch = useDispatch();
    const deleteCommonCodeHandler = async () => {
        const params = codeInfoForm.getFieldsValue(["groupCode", "code"]);
        const deleteConfirm = window.confirm("삭제하시겠습니까?");
        if (!deleteConfirm) {
            return;
        }
        const result = await commonCodeService.deleteCommonCode(params);
        if (result.success) {
            const filteredCommonCodes = commonCodeData.filter((code) => {
                return !(code.groupCode === params.groupCode && code.code === params.code);
            });
            dispatch(setCommonCodeData(filteredCommonCodes));
            codeInfoForm.resetFields();
            setSaveInfoData({});
        }
    };
    return (
        <Card
            title="공통코드 정보"
            extra={
                <Space size={8}>
                    <Button type="primary" children="수정" onClick={codeInfoForm.submit} />
                    <Button children="삭제" onClick={deleteCommonCodeHandler} />
                </Space>
            }
            style={{ height: "95%", marginBottom: "50px" }}
        >
            <CommonCodeForm
                codeForm={codeInfoForm}
                setCommonCodeData={setCommonCodeData}
                setSaveInfoData={setSaveInfoData}
            >
                <SaveInfo saveInfoData={saveInfoData} />
            </CommonCodeForm>
        </Card>
    );
};

export default CommonCodeInfo;
