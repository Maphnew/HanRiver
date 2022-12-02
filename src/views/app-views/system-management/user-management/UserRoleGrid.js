import { AgGridReact } from "ag-grid-react";
import { Col } from "antd";

const tempData = [
    { key: "1", roleName: "DA" },
    { key: "2", roleName: "DBA" },
    { key: "3", roleName: "MODEL" },
    { key: "4", roleName: "업무담당자" },
    { key: "5", roleName: "또 다른 역할" },
];

const UserRoleGrid = (props) => {
    return (
        <Col sm={24} md={24} lg={24} xl={24}>
            <div
                className="ag-theme-material"
                style={{
                    height: "100%",
                    minWidth: "300px",
                    minHeight: "150px",
                    marginTop: "20px",
                }}
            >
                <div>역할목록</div>
                <AgGridReact
                    columnDefs={[
                        {
                            field: "used",
                            headerName: "사용여부",
                            sortable: true,
                            filter: true,
                            checkboxSelection: true,
                            cellStyle: {
                                lineHeight: "30px",
                            },
                        },
                        {
                            field: "roleName",
                            headerName: "역할명",
                            sortable: true,
                            filter: true,
                            cellStyle: {
                                lineHeight: "30px",
                            },
                        },
                    ]}
                    defaultColDef={{
                        flex: 1,
                        resizable: true,
                    }}
                    rowSelection={"multiple"}
                    rowData={tempData}
                    headerHeight={32}
                    rowHeight={32}
                />
            </div>
        </Col>
    );
};

export default UserRoleGrid;
