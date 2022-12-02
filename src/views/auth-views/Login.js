import LoginForm from "./components/LoginForm";
import { Card, Row, Col } from "antd";

const Login = (props) => {
    return (
        <div
            style={{
                display: "flex",
                height: "100%",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <Row justify="center">
                <Col xs={20} sm={20} md={20} lg={7}>
                    <Card>
                        <Row justify="center">
                            <Col xs={24} sm={24} md={20} lg={20}>
                                <LoginForm />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
