import { AgGridReact } from "ag-grid-react";

const MessageCodeModalGrid = (props) => {
    const { rowData, pagination, rowClickHandler, gridReadyHandler, modalHandleOk } = props;
    const rowDoubleClickHandler = (params) => {
        rowClickHandler(params);
        modalHandleOk();
    };
    const gridSizedChangedHandler = (params) => {
        let { api } = params;
        api.sizeColumnsToFit();
    };
    return (
        <div
            className="ag-theme-material"
            style={{
                height: "95%",
                minWidth: "300px",
                minHeight: "400px",
                marginTop: "10px",
            }}
        >
            <AgGridReact
                columnDefs={[
                    {
                        field: "msgCode",
                        headerName: "메시지코드",
                        sortable: true,
                        filter: true,
                        maxWidth: 250,
                        cellStyle: { lineHeight: "30px" },
                    },
                    {
                        field: "msgLang",
                        headerName: "메시지국가코드",
                        sortable: true,
                        filter: true,
                        maxWidth: 150,
                        cellStyle: { lineHeight: "30px" },
                    },
                    {
                        field: "msgText",
                        headerName: "메시지내용",
                        sortable: true,
                        filter: true,
                        cellStyle: { lineHeight: "30px" },
                    },
                ]}
                defaultColDef={{
                    flex: 1,
                    resizable: true,
                }}
                headerHeight={32}
                rowHeight={32}
                rowData={rowData}
                pagination={pagination}
                onRowClicked={rowClickHandler}
                onRowDoubleClicked={rowDoubleClickHandler}
                onGridReady={gridReadyHandler}
                onGridSizeChanged={gridSizedChangedHandler}
            />
        </div>
    );
};

export default MessageCodeModalGrid;
