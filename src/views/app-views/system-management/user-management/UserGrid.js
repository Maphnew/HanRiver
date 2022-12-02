import { AgGridReact } from "ag-grid-react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import userService from "../../../../services/user-service";
import { mapUserProperties } from "../../../../utils/view-utils/user-management";
import { setSelectedUserObjectId } from "../../../../redux/slices/user-slice";

const UserGrid = (props) => {
    const { form, setGridApi, setSaveInfoData } = props;
    const users = useSelector((state) => state.userManagement.users);
    const dispatch = useDispatch();
    const gridReadyHandler = (params) => {
        setGridApi(params.api);
    };
    const gridSizedChangedHandler = (param) => {
        let { api } = param;
        api.sizeColumnsToFit();
    };
    const rowClickHandler = async (params) => {
        const userObject = await userService.getUser(params.data.objectId);
        const user = mapUserProperties(userObject.response.propertyList);
        dispatch(setSelectedUserObjectId(userObject.response.objectId));

        const filteredUserProperties = {
            userFullName: user.userFullName ? user.userFullName.propertyVal : "",
            userName: user.userName ? user.userName.propertyVal : "",
            userStatus: user.userStatus ? user.userStatus.propertyVal : "",
            countryName: user.countryName ? user.countryName.propertyVal : "",
            email: user.email ? user.email.propertyVal : "",
            phoneNumber: user.phoneNumber ? user.phoneNumber.propertyVal : "",
            expireDate: user.expireDate ? moment(user.expireDate.propertyVal) : "",
        };
        // TODO: API에 저장정보 데이터 추가
        // setSaveInfoData({
        //     createDt: user.createDate,
        //     cusrId: user.creatorName,
        //     modifyDt: user.modifiedDate,
        //     musrId: user.modifierName,
        // });
        form.setFieldsValue(filteredUserProperties);
    };
    return (
        <div
            className="ag-theme-material app-grid-card"
            style={{
                height: "95%",
                minHeight: "400px",
            }}
        >
            <AgGridReact
                columnDefs={[
                    {
                        field: "userFullName",
                        headerName: "사용자전체이름",
                        sortable: true,
                        filter: true,
                        // cellStyle: { lineHeight: "30px" },
                    },
                    {
                        field: "userName",
                        headerName: "사용자명",
                        sortable: true,
                        filter: true,
                        // cellStyle: { lineHeight: "30px" },
                    },
                    {
                        field: "userStatus",
                        headerName: "사용자상태",
                        sortable: true,
                        filter: true,
                        // cellStyle: { lineHeight: "30px" },
                    },
                ]}
                defaultColDef={{
                    flex: 1,
                    resizable: true,
                }}
                // headerHeight={32}
                // rowHeight={32}
                rowData={users}
                onGridReady={gridReadyHandler}
                onRowClicked={rowClickHandler}
                onGridSizeChanged={gridSizedChangedHandler}
            />
        </div>
    );
};

export default UserGrid;
