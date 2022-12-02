import { useNavigate } from "react-router-dom";
import { Space, Avatar, Popover } from "antd";

const title = (
    <div>
        <h3>Hong Gildong</h3>
        <span style={{ color: "gray" }}>Software Engineer</span>
    </div>
);

const NavProfile = (props) => {
    let navigate = useNavigate();
    const signOutHandler = () => {
        navigate("/auth/login");
    };
    const content = (
        <div>
            <p>Edit Profile</p>
            <p>Account Setting</p>
            <p style={{ cursor: "pointer" }} onClick={signOutHandler}>
                Sign Out
            </p>
        </div>
    );
    return (
        <Space size={8}>
            <Popover content={content} title={title} trigger={"click"}>
                <Avatar
                    style={{ cursor: "pointer" }}
                    src="https://joeschmoe.io/api/v1/random"
                />
            </Popover>
            <span>Hong GilDong</span>
        </Space>
    );
};

export default NavProfile;
