import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import roleService from "../../../../services/role-service";
import { mapRoleProperties } from "../../../../utils/view-utils/role-management";
import { setSelectedRole } from "../../../../redux/slices/role-slice";

const RoleCodeRenderer = (props) => {
    const messages = useSelector((state) => state.messageManagement.messages);
    const value = messages.find((msg) => {
        return msg.msgCode === props.value;
    });
    return <div>{value ? value.msgText : ""}</div>;
};

const RoleGrid = (props) => {
    const { form, setSaveInfoData } = props;
    const roles = useSelector((state) => state.roleManagement.roles);
    const dispatch = useDispatch();
    const rowClickHandler = async (params) => {
        const roleObject = await roleService.getRole(params.data.objectId);
        const { objectId, createDt, cusrId, modifyDt, musrId } = roleObject.response;
        const role = mapRoleProperties(roleObject.response.propertyList);
        const filteredRoleProperties = {
            objectId,
            roleCode: role.roleCode ? role.roleCode.propertyVal : "",
            roleName: role.roleName ? role.roleName.propertyVal : "",
        };
        setSaveInfoData({
            createDt: createDt ?? "",
            cusrId: cusrId ?? "",
            modifyDt: modifyDt ?? "",
            musrId: musrId ?? "",
        });
        dispatch(setSelectedRole(filteredRoleProperties));
        form.setFieldsValue(filteredRoleProperties);
    };
    const gridSizedChangedHandler = (param) => {
        let { api } = param;
        api.sizeColumnsToFit();
    };
    return (
        <div
            className="ag-theme-material app-grid-card"
            style={{
                height: "100%",
                minHeight: "400px",
            }}
        >
            <AgGridReact
                columnDefs={[
                    {
                        field: "roleCode",
                        headerName: "역할명",
                        sortable: true,
                        filter: true,
                        // cellStyle: {
                        //     lineHeight: "30px",
                        // },
                        cellRenderer: "roleCodeRenderer",
                    },
                ]}
                defaultColDef={{
                    flex: 1,
                    resizable: true,
                }}
                frameworkComponents={{
                    roleCodeRenderer: RoleCodeRenderer,
                }}
                // headerHeight={32}
                // rowHeight={32}
                rowData={roles}
                onRowClicked={rowClickHandler}
                onGridSizeChanged={gridSizedChangedHandler}
            />
        </div>
    );
};

export default RoleGrid;
