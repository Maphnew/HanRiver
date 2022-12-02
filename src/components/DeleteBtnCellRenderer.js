import { Popconfirm } from "antd";
import { MinusSquareOutlined } from "@ant-design/icons";

const DeleteBtnCellRenderer = (props) => {
    return (
        <Popconfirm title={props.title} onConfirm={props.btnClickHandler}>
            <MinusSquareOutlined />
        </Popconfirm>
    );
};

export default DeleteBtnCellRenderer;
