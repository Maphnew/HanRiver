import { useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Space, Table, Card, Input, Button, Popconfirm, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ClassModal from "./ClassModal";
import metaClassService from "../../../../services/meta-class-service";
import { setClasses } from "../../../../redux/slices/meta-class-slice";

const ClassSearchForm = (props) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const submitHandler = async (formFields) => {
        const className = formFields.className ? formFields.className : "";
        const metaClasses = await metaClassService.getMetaClass(className);
        if (metaClasses && metaClasses.success) {
            dispatch(setClasses(metaClasses.response));
        }
    };
    return (
        <>
            <Form
                form={form}
                name="classSearchForm"
                onFinish={submitHandler}
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                autoComplete="off"
            >
                <Form.Item
                    name="className"
                    className="detail-search"
                    label={
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div>CLASS명</div>
                            <Button htmlType="submit" type="link" icon={<SearchOutlined />} children="Search" />
                        </div>
                    }
                >
                    <Input allowClear />
                </Form.Item>
            </Form>
        </>
    );
};

export default ClassSearchForm;
