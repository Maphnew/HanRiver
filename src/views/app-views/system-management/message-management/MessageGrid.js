import { Row } from "antd";
import { AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";

const MessageGrid = (props) => {
    const { pagination = false, rowClickHandler, gridReadyHandler } = props;
    const messages = useSelector((state) => state.messageManagement.messages);
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
                        field: "msgCode",
                        headerName: "메시지코드",
                        sortable: true,
                        filter: true,
                        // cellStyle: { lineHeight: "30px" },
                    },
                    {
                        field: "msgLang",
                        headerName: "메시지국가코드",
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
                rowData={messages}
                pagination={pagination}
                onRowClicked={rowClickHandler}
                onGridReady={gridReadyHandler}
                onGridSizeChanged={gridSizedChangedHandler}
            />
        </div>
    );
};

export default MessageGrid;
