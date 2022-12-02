import { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Row, Col, Button, Input, Form, Space, Tooltip, DatePicker } from "antd";
import { MinusCircleFilled, SearchOutlined, ZoomInOutlined } from "@ant-design/icons";
import moment from "moment";

import commonCodeService from "../../../../services/common-code-service";
import { setCommonCodeData } from "../../../../redux/slices/common-code-slice";

const { RangePicker } = DatePicker;

const CommonCodeSearchForm = (props) => {
    const [detailSearchOn, setDetailSearchOn] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const submitHandler = async (formFields) => {
        const params = { ...formFields };
        if (detailSearchOn) {
            const [startCreateDt, endCreateDt] = destructDates(formFields.createDt);
            const [startModifyDt, endModifyDt] = destructDates(formFields.modifiedDt);
            params.startCreateDt = formatsDateType(startCreateDt);
            params.endCreateDt = formatsDateType(endCreateDt);
            params.startModifyDt = formatsDateType(startModifyDt);
            params.endModifyDt = formatsDateType(endModifyDt);
        }
        delete params.createDt;
        const codes = await commonCodeService.searchCommonCodes(params);
        if (codes && codes.success) {
            dispatch(setCommonCodeData(codes.response));
        }
    };
    const destructDates = (dates) => {
        const [startDt, endDt] = dates ? dates : ["", ""];
        return [startDt, endDt];
    };
    const formatsDateType = (date) => {
        return date ? moment(date).format("YYYY-MM-DD") : "";
    };
    const toggleDetailSearch = () => {
        setDetailSearchOn(!detailSearchOn);
    };
    return (
        <Card
            style={{
                width: "100%",
                height: "100%",
                borderTop: "2px solid #ee8a1b",
            }}
        >
            <Form
                form={form}
                name="commonCodeSearchForm"
                onFinish={submitHandler}
                size="small"
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                autoComplete="off"
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={21} xxl={21}>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
                                <Form.Item
                                    name="codeName"
                                    className="detail-search"
                                    label={
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div>공통코드명</div>
                                            {detailSearchOn ? (
                                                <Tooltip placement="topLeft" title={"Detail Search"}>
                                                    <MinusCircleFilled onClick={toggleDetailSearch} />
                                                </Tooltip>
                                            ) : (
                                                <Tooltip placement="topLeft" title={"Detail Search"}>
                                                    <ZoomInOutlined
                                                        style={{
                                                            color: "#ee8a1b",
                                                        }}
                                                        onClick={toggleDetailSearch}
                                                    />
                                                </Tooltip>
                                            )}
                                        </div>
                                    }
                                >
                                    <Input placeholder="공통코드명" allowClear />
                                </Form.Item>
                            </Col>
                            {detailSearchOn && (
                                <>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
                                        <Form.Item name="groupCode" label="그룹코드">
                                            <Input placeholder="그룹코드" allowClear />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
                                        <Form.Item name="cusrId" label="생성자">
                                            <Input placeholder="생성자" allowClear />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
                                        <Form.Item name="musrId" label="수정자">
                                            <Input placeholder="수정자" allowClear />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
                                        <Form.Item name="code" label="공통코드">
                                            <Input placeholder="공통코드" allowClear />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
                                        <Form.Item name="groupCodeName" label="그룹코드명">
                                            <Input placeholder="그룹코드명" allowClear />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
                                        <Form.Item name="createDt" label="생성일자">
                                            <RangePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
                                        <Form.Item name="modifiedDt" label="수정일자">
                                            <RangePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
                                        <Form.Item name="codeDescription" label="공통코드설명">
                                            <Input placeholder="공통코드설명" allowClear />
                                        </Form.Item>
                                    </Col>
                                </>
                            )}
                        </Row>
                    </Col>
                    <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        xl={3}
                        xxl={3}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "end",
                        }}
                    >
                        <Space size={8}>
                            <Button htmlType="submit" type="primary" icon={<SearchOutlined />}>
                                Search
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default CommonCodeSearchForm;
