import { Form, Modal } from "antd";
import CommonCodeForm from "./CommonCodeForm";

const CommonCodeModal = (props) => {
    const { modalOpen, setModalOpen, gridApi } = props;
    const [commonCodeForm] = Form.useForm();
    return (
        <Modal
            title="신규 공통코드"
            visible={modalOpen}
            width={"70%"}
            okText="확인"
            cancelText="취소"
            onOk={commonCodeForm.submit}
            onCancel={() => setModalOpen(false)}
        >
            <CommonCodeForm codeForm={commonCodeForm} isNewCommonCodeModal={true} setModalOpen={setModalOpen} />
        </Modal>
    );
};

export default CommonCodeModal;
