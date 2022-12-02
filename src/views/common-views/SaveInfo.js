import { Row, Col, Input } from "antd";
import { UserOutlined, TableOutlined } from "@ant-design/icons";
const SaveInfo = (props) => {
    const { saveInfoData = {} } = props;
    return (
        <>
            <Col sm={24} md={12} lg={6} xl={6}>
                <h4>생성일자</h4>
                <Input placeholder="생성일자" value={saveInfoData.createDt} readOnly></Input>
            </Col>
            <Col sm={24} md={12} lg={6} xl={6}>
                <h4>생성자</h4>
                <Input placeholder="생성자" value={saveInfoData.cusrId} readOnly></Input>
            </Col>
            <Col sm={24} md={12} lg={6} xl={6}>
                <h4>수정일자</h4>
                <Input placeholder="수정일자" value={saveInfoData.modifyDt} readOnly></Input>
            </Col>
            <Col sm={24} md={12} lg={6} xl={6}>
                <h4>수정자</h4>
                <Input placeholder="수정자" value={saveInfoData.musrId} readOnly></Input>
            </Col>
        </>
    );
};

export default SaveInfo;
