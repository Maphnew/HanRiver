import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Col, Form, Input, Row, Select } from "antd";
import metaClassService from "../../../../services/meta-class-service";
import propertyService from "../../../../services/property-service";
import PropertyQualificationGrid from "./PropertyQualificationGrid";
import { setProperties } from "../../../../redux/slices/meta-class-slice";

const { Search } = Input;
const { Option } = Select;

const propertyOptions = [
    "CHAR",
    "TEXT",
    "CODE",
    "DATE(YYYY-MM-DD)",
    "DATE(YYYY-MM-DD HH24:MI:SS)",
    "NUMBER",
    "NUMBER(전화번호)",
    "TAG",
];

const propertyQualifications = [
    { value: "EQUAL", option: "같음" },
    { value: "ABOVE", option: "초과" },
    { value: "BELOW", option: "미만" },
    { value: "MORE", option: "이상" },
    { value: "LESS", option: "이하" },
    { value: "INCLUDE", option: "포함" },
    { value: "EXCLUDE", option: "제외" },
    { value: "RE", option: "정규표현식" },
    { value: "SYSTEM", option: "시스템" },
];

const PropertyForm = (props) => {
    const { form, isNewPropertyModal, setVisible, propertyRules = [], setPropertyRules, masterYnTrue } = props;
    const properties = useSelector((state) => state.metaClassManagement.properties);
    const selectedClass = useSelector((state) => state.metaClassManagement.selectedClass);
    const dispatch = useDispatch();
    const submitHandler = async (formFields) => {
        if (!selectedClass) {
            return;
        }
        const {
            columnName,
            conditionCheckboxGroup = [],
            msgCode,
            propertyId,
            propertyName,
            propertyQualification,
            propertySeq,
            propertyType,
        } = formFields;
        const checkboxGroup = conditionCheckboxGroup.reduce((prevCondition, currCondition) => {
            return { ...prevCondition, [currCondition]: "Y" };
        }, {});

        const body = Object.assign(checkboxGroup, {
            metaClass: selectedClass,
            propertyId,
            propertyName,
            propertyType,
            columnName,
            msgCode,
            propertySeq,
            propertyRuleDtoList: propertyRules,
        });
        const fetchProperties = async (classId) => {
            const properties = await metaClassService.getProperties(classId);
            if (properties && properties.success) {
                dispatch(setProperties(properties.response.mclassPropertyList));
            }
        };
        if (isNewPropertyModal) {
            const result = await propertyService.createProperty(body);
            if (result && result.success) {
                alert(result.response.message);
                setVisible(false);
                fetchProperties(selectedClass.classId);
            }
        } else {
            if (!propertyId) {
                return;
            }
            const result = await propertyService.updateProperty(body);
            if (result && result.success) {
                alert(result.response.message);
                const updatedProperties = properties.map((ppty) => {
                    if (ppty.propertyId !== propertyId) {
                        return ppty;
                    } else {
                        return {
                            propertyId,
                            columnName,
                            propertyName,
                            propertySeq,
                            propertyType,
                            masterYn: body.masterYn ? body.masterYn : "N",
                            searchDefYn: body.searchDefYn ? body.searchDefYn : "N",
                            searchReqYn: body.searchReqYn ? body.searchReqYn : "N",
                        };
                    }
                });
                dispatch(setProperties(updatedProperties));
            }
        }
    };
    const addPropertyRulesHandler = (params) => {
        if (params === "") {
            return;
        }
        const option = form.getFieldValue("propertyQualification");
        setPropertyRules((prevState) => {
            return prevState.concat({
                ruleType: option,
                ruleScript: params,
            });
        });
    };
    return (
        <Form
            form={form}
            size="small"
            name="propertyForm"
            onFinish={submitHandler}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            autoComplete="off"
        >
            <Form.Item name="conditionCheckboxGroup">
                <Checkbox.Group style={{ width: "100%" }}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={6}>
                            <Checkbox value={"masterYn"} disabled>
                                마스터항목여부
                            </Checkbox>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={6}>
                            <Checkbox value={"searchReqYn"}>검색필수항목여부</Checkbox>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={6}>
                            <Checkbox value={"searchDefYn"}>검색기본항목여부</Checkbox>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={6}>
                            <Checkbox value={"requiredYn"} disabled={masterYnTrue}>
                                입력필수여부
                            </Checkbox>
                        </Col>
                    </Row>
                </Checkbox.Group>
            </Form.Item>
            <Row gutter={[16, 8]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                    <Form.Item name="propertyName" label="PROPERTY명">
                        <Input placeholder="Enter a property name" allowClear />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                    <Form.Item name="columnName" label="변수명">
                        <Input placeholder="Enter a column name" allowClear={!masterYnTrue} disabled={masterYnTrue} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                    <Form.Item name="msgCode" label="메시지코드">
                        <Search placeholder="Search" allowClear />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                    <Form.Item name="propertySeq" label="PROPERTY순서">
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                    <Form.Item name="propertyId" label="PROPERTYID">
                        <Input disabled value="7000001" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                    <Form.Item
                        label="PROPERTY종류"
                        name="propertyType"
                        initialValue={propertyOptions.length > 0 ? propertyOptions[0] : ""}
                    >
                        <Select style={{ width: "100%" }} disabled={masterYnTrue}>
                            {propertyOptions.map((option) => {
                                return (
                                    <Option key={option} value={option}>
                                        {option}
                                    </Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ paddingBottom: "20px" }}>
                    <h4>PROPERTY 조건</h4>
                    <PropertyQualificationGrid
                        propertyRules={propertyRules}
                        setPropertyRules={setPropertyRules}
                        isNewPropertyModal={isNewPropertyModal}
                    />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                    <Form.Item label="PROPERTY조건" name="propertyQualification" initialValue="EQUAL">
                        <Select style={{ width: "100%" }}>
                            {propertyQualifications.map((optionData) => {
                                return (
                                    <Option
                                        key={optionData.value}
                                        value={optionData.value}
                                        children={optionData.option}
                                    />
                                );
                            })}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={16}>
                    <Form.Item label="스크립트">
                        <Search enterButton="추가" allowClear onSearch={addPropertyRulesHandler} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default PropertyForm;
