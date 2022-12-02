import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Row, Select } from "antd";

import SaveInfo from "../../../common-views/SaveInfo";
import MessageCodeModal from "../../../common-views/MessageCodeModal";
import menuService from "../../../../services/menu-service";

const { Search } = Input;
const { Option } = Select;

const MenuInfo = (props) => {
    const [form] = Form.useForm();
    const [menuClass, setMenuClass] = useState({});
    const [msgModalOpen, setMsgModalOpen] = useState(false);

    let msgCodeField = "";

    useEffect(() => {
        const fetchMenuClass = async () => {
            const menuClassDefinition = await menuService.getMenuClassDefinition();
            if (menuClassDefinition && menuClassDefinition.success) {
                setMenuClass(menuClassDefinition.response);
            }
        };
        fetchMenuClass();
    }, []);
    const submitHandler = async () => {};
    const msgCodeSearchHandler = () => {
        setMsgModalOpen(true);
    };
    // TODO: ELEMENT 자동 생성 메뉴가 추가되면 아래의 로직 재사용 가능 하도록 모듈화
    const buildFormItem = (property) => {
        return (
            <Form.Item key={property.propertyId} label={property.propertyName} name={property.columnName}>
                {buildFormElement(property)}
            </Form.Item>
        );
    };
    const buildFormElement = (property) => {
        switch (property.propertyType) {
            case "CODE":
                msgCodeField = property.columnName;
                return <Search onClick={msgCodeSearchHandler} onSearch={msgCodeSearchHandler} />;
                break;
            case "TEXT":
                return <Input />;
                break;
            case "TAG":
                return (
                    <Select>
                        <Option value="Y">사용</Option>
                        <Option value="N">미사용</Option>
                    </Select>
                );
                break;
            default:
                break;
        }
    };
    return (
        <Card
            title={"메뉴정보"}
            extra={<Button type="primary" onClick={form.submit} children={"저장"} />}
            style={{
                height: "100%",
                borderTop: "2px solid #ee8a1b",
            }}
        >
            <Form
                form={form}
                name={"menuForm"}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={submitHandler}
            >
                {menuClass.mclassPropertyList &&
                    menuClass.mclassPropertyList.length > 0 &&
                    menuClass.mclassPropertyList.map((property) => {
                        return buildFormItem(property);
                    })}
            </Form>
            <Row gutter={[16, 16]} style={{ marginTop: "15px" }}>
                <SaveInfo />
            </Row>
            <MessageCodeModal
                form={form}
                visible={msgModalOpen}
                setVisible={setMsgModalOpen}
                fieldName={msgCodeField}
            />
        </Card>
    );
};

export default MenuInfo;
