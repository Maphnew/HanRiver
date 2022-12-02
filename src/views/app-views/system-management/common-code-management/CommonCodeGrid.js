import { AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";

const CommonCodeGrid = (props) => {
    const { pagination = false, rowClickHandler, gridReadyHandler } = props;
    const commonCodeData = useSelector((state) => state.commonCodeManagement.commonCodeData);
    const gridSizedChangedHandler = (param) => {
        let { api } = param;
        api.sizeColumnsToFit();
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
                        field: "groupCode",
                        headerName: "그룹코드",
                        sortable: true,
                        filter: true,
                    },
                    {
                        field: "code",
                        headerName: "공통코드",
                        sortable: true,
                        filter: true,
                    },
                    {
                        field: "codeName",
                        headerName: "공통코드명",
                        sortable: true,
                        filter: true,
                    },
                ]}
                defaultColDef={{
                    flex: 1,
                    resizable: true,
                }}
                rowData={commonCodeData}
                pagination={pagination}
                onRowClicked={rowClickHandler}
                onGridReady={gridReadyHandler}
                onGridSizeChanged={gridSizedChangedHandler}
            />
        </div>
    );
};

export default CommonCodeGrid;
