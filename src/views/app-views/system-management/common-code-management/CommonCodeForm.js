import { Form, Row, Col, Input, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import commonCodeService from "../../../../services/common-code-service";
import { setCommonCodeData } from "../../../../redux/slices/common-code-slice";

const CommonCodeForm = (props) => {
    const { codeForm, isNewCommonCodeModal, setModalOpen, setSaveInfoData } = props;
    const commonCodeData = useSelector((state) => state.commonCodeManagement.commonCodeData);
    const dispatch = useDispatch();
    const submitHandler = async (formFields) => {
        const body = { ...formFields };
        if (isNewCommonCodeModal) {
            const result = await commonCodeService.createCommonCode(body);
            if (result && result.success) {
                alert(result.response.message);
                setModalOpen(false);
            } else {
                return;
            }
        } else {
            const result = await commonCodeService.updateCommonCode(body);
            if (result && result.success) {
                alert(result.response.message);
            } else {
                return;
            }
        }
        fetchCode({ groupCode: body.groupCode, code: body.code });
    };
    const fetchCode = async (params) => {
        const code = await commonCodeService.getCommonCode(params);
        if (!code) {
            return;
        }
        code.success && reflectUpdatedData(code.response);
    };
    const reflectUpdatedData = (data) => {
        if (isNewCommonCodeModal) {
            dispatch(setCommonCodeData([data, ...commonCodeData]));
        } else {
            setSaveInfoData({
                cusrId: data.cusrId ?? "",
                createDt: data.createDt ?? "",
                musrId: data.musrId ?? "",
                modifyDt: data.modifyDt ?? "",
            });
            const codeIndex = commonCodeData.findIndex((code) => {
                return code.groupCode === data.groupCode && code.code === data.code;
            });
            const result = [...commonCodeData];
            result[codeIndex] = data;

            dispatch(setCommonCodeData(result));
        }
    };
    return (
        <Form
            form={codeForm}
            name="codeForm"
            onFinish={submitHandler}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
        >
            <Row gutter={[16, 16]}>
                <Col sm={24} md={24} lg={12} xl={12}>
                    <Form.Item
                        label="그룹코드"
                        name="groupCode"
                        rules={[
                            {
                                required: true,
                                message: "Please input a group code!",
                            },
                        ]}
                    >
                        <Input placeholder="그룹코드" allowClear readOnly={isNewCommonCodeModal ? false : true} />
                    </Form.Item>
                </Col>
                <Col sm={24} md={24} lg={12} xl={12}>
                    <Form.Item label="그룹코드명" name="groupCodeName">
                        <Input placeholder="그룹코드명" allowClear />
                    </Form.Item>
                </Col>
                <Col sm={24} md={24} lg={12} xl={12}>
                    <Form.Item
                        label="공통코드"
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: "Please input a code!",
                            },
                        ]}
                    >
                        <Input placeholder="공통코드" allowClear readOnly={isNewCommonCodeModal ? false : true} />
                    </Form.Item>
                </Col>
                <Col sm={24} md={24} lg={12} xl={12}>
                    <Form.Item label="공통코드명" name="codeName">
                        <Input placeholder="공통코드명" allowClear />
                    </Form.Item>
                </Col>
                <Col sm={24} md={24} lg={6} xl={6}>
                    <Form.Item label="공통코드순서" name="codeSeq">
                        <InputNumber placeholder="0" style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
                <Col sm={24} md={24} lg={24} xl={24}>
                    <Form.Item label="공통코드설명" name="codeDescription">
                        <Input.TextArea rows="4" allowClear />
                    </Form.Item>
                </Col>
                {props.children}
            </Row>
        </Form>
    );
};

export default CommonCodeForm;
