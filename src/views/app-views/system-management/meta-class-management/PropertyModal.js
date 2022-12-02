import { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Modal } from "antd";
import PropertyForm from "./PropertyForm";

const PropertyModal = (props) => {
    const { visible, setVisible } = props;
    const [propertyRules, setPropertyRules] = useState([]);
    const [form] = Form.useForm();
    const selectedClass = useSelector((state) => state.metaClassManagement.selectedClass);
    const cancleHandler = () => {
        setVisible(false);
    };
    return (
        <Modal
            title={`${selectedClass ? selectedClass.className : ""} 클래스 - 신규 프로퍼티 생성`}
            width="70%"
            visible={visible}
            okText="확인"
            cancelText="취소"
            onOk={form.submit}
            onCancel={cancleHandler}
        >
            <PropertyForm
                form={form}
                isNewPropertyModal={true}
                setVisible={setVisible}
                propertyRules={propertyRules}
                setPropertyRules={setPropertyRules}
            />
        </Modal>
    );
};

export default PropertyModal;
