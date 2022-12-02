import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Space, Tooltip } from "antd";
import { useState } from "react";
import { MinusCircleFilled, SearchOutlined, ZoomInOutlined, InfoCircleOutlined } from "@ant-design/icons";

import utils from "../../../../utils";
import userService from "../../../../services/user-service";

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;

const mqlTips = "도움말";

const UserSearchForm = (props) => {
    const { setMappedUsers, propertyMap } = props;
    const [mqlSearchInputOpen, setMqlSearchInputOpen] = useState(false);
    const [form] = Form.useForm();

    const submitHandler = async (formFields) => {
        const args = utils.buildMqlQuery(propertyMap, formFields);
        if (args.mql.length !== 0) {
            const users = await userService.searchUser(args);
            if (users && users.success) {
                setMappedUsers(users.response);
            }
        } else {
            const users = await userService.getAllUsers();
            if (users && users.success) {
                setMappedUsers(users.response);
            }
        }
    };

    const mqlSearchInputHandler = () => {
        setMqlSearchInputOpen(!mqlSearchInputOpen);
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
                name="userSearchForm"
                onFinish={submitHandler}
                size="small"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                autoComplete="off"
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={20} xxl={20}>
                        <Row gutter={[16, 16]} style={{ alignItems: "center" }}>
                            {mqlSearchInputOpen ? (
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Input
                                        prefix={
                                            <Tooltip placement="bottomLeft" title={mqlTips}>
                                                <InfoCircleOutlined />
                                            </Tooltip>
                                        }
                                        placeholder={
                                            "사용자전체명 EQ hong AND 사용자명 EQ 홍길동 AND 사용자상태 EQ 사용 AND 국가명 EQ 대한민국"
                                        }
                                        style={{ margin: "20px 0px" }}
                                    />
                                </Col>
                            ) : (
                                <SearchInputs />
                            )}
                        </Row>
                    </Col>
                    <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        xl={4}
                        xxl={4}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "end",
                        }}
                    >
                        <Space size={8}>
                            <Button type="link" children={"고급"} onClick={mqlSearchInputHandler} />
                            <Button type="primary" htmlType="submit" children={"Search"} icon={<SearchOutlined />} />
                        </Space>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

const SearchInputs = (props) => {
    const [detailSearchOn, setDetailSearchOn] = useState(false);
    const toggleDetailSearch = () => {
        setDetailSearchOn(!detailSearchOn);
    };
    return (
        <>
            <Col xs={24} sm={24} md={24} lg={12} xl={5} xxl={5}>
                <Form.Item
                    className="detail-search"
                    name="userFullName"
                    label={
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div>사용자전체명</div>
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
                    <Input placeholder="사용자전체명" allowClear />
                </Form.Item>
            </Col>
            {detailSearchOn && (
                <>
                    <Col xs={24} sm={24} md={24} lg={12} xl={5} xxl={5}>
                        <Form.Item label="사용자명" name="userName">
                            <Input placeholder="사용자명" allowClear />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={5} xxl={5}>
                        <Form.Item label="사용자상태" name="userStatus" initialValue="all">
                            <Select>
                                <Option value="all">전체</Option>
                                <Option value="Y">사용</Option>
                                <Option value="N">미사용</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={5} xxl={5}>
                        <Form.Item label="국가명" name="countryName" initialValue="all">
                            <Select>
                                <Option value="all">전체</Option>
                                <Option value="korea">대한민국</Option>
                                <Option value="usa">미국</Option>
                                <Option value="japan">일본</Option>
                                <Option value="china">중국</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={4} xxl={4}>
                        <Form.Item label="부서/소속" name="department">
                            <Input placeholder="부서/소속" allowClear />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={5} xxl={5}>
                        <Form.Item label="e-mail" name="email">
                            <Input placeholder="example@example.com" allowClear />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={5} xxl={5}>
                        <Form.Item label="전화번호" name="phoneNumber">
                            <Input placeholder="000-0000-0000" allowClear />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={10} xxl={10}>
                        <Form.Item label="만료일자" name="expireDate">
                            <RangePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={4} xxl={4}>
                        <Form.Item label="역할" name="role">
                            <Input placeholder="역할" allowClear />
                        </Form.Item>
                    </Col>
                </>
            )}
        </>
    );
};

export default UserSearchForm;
