import { Button, Card, Col } from "antd";
import ContentWrapper from "../../../../components/ContentWrapper";

const Main = (props) => {
    return (
        <ContentWrapper
            buttons={
                <>
                    <Button type="link">생성</Button>
                    <Button type="link">삭제</Button>
                </>
            }
        >
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Card>Main</Card>
            </Col>
        </ContentWrapper>
    );
};

export default Main;
