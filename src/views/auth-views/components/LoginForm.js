import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";

const initialCredential = {
    email: "metastream@datastreams.co.kr",
    password: "password1234",
};

const LoginForm = () => {
    let navigate = useNavigate();
    const [form] = Form.useForm();
    const submitHandler = (params) => {
        console.log(params.email);
        navigate("/");
    };
    return (
        <div className="login-form">
            <Form
                form={form}
                layout="vertical"
                name="login-form"
                initialValues={initialCredential}
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                onFinish={submitHandler}
            >
                <Form.Item name="email" label="E-mail">
                    <Input placeholder="example@example.com" allowClear />
                </Form.Item>
                <Form.Item name="password" label="Password">
                    <Input.Password placeholder="password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;
