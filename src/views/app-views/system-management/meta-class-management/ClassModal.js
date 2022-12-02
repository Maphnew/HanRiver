import { Form, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";

import ClassForm from "./ClassForm";
import metaClassService from "../../../../services/meta-class-service";
import { setClasses } from "../../../../redux/slices/meta-class-slice";

const ClassModal = (props) => {
    const { visible, setVisible } = props;
    const [form] = Form.useForm();
    const classes = useSelector((state) => state.metaClassManagement.classes);
    const dispatch = useDispatch();
    const cancleHandler = () => {
        setVisible(false);
    };
    const submitHandler = async (formFields) => {
        const body = {
            classId: formFields.classId,
            className: formFields.className,
            containerClassId: formFields.containerClassId,
            classTypeName: formFields.classTypeName,
        };
        const result = await metaClassService.createMetaClass(body);
        if (result && result.success) {
            alert(result.response.message);
            dispatch(setClasses([].concat(body).concat(classes)));
            setVisible(false);
        }
    };
    return (
        <Modal
            title="신규 클래스"
            visible={visible}
            okText="확인"
            cancelText="취소"
            onOk={form.submit}
            onCancel={cancleHandler}
        >
            <ClassForm form={form} submitHandler={submitHandler} />
        </Modal>
    );
};

export default ClassModal;
