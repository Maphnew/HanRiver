import { useState } from "react";
import { AgGridReact } from "ag-grid-react";

import DeleteBtnCellRenderer from "../../../../components/DeleteBtnCellRenderer";

const BtnCellRenderer = (props) => {
    const btnClickHandler = () => {
        props.deleteHandler(props.data);
    };
    return <DeleteBtnCellRenderer title={"Sure to delete?"} btnClickHandler={btnClickHandler} />;
};

const PropertyQualificationGrid = (props) => {
    const { propertyRules, setPropertyRules, isNewPropertyModal } = props;
    const [gridApi, setGridApi] = useState(null);
    const deleteHandler = (row) => {
        if (isNewPropertyModal) {
            setPropertyRules((prevState) => {
                return prevState.filter((rule) => {
                    return !(rule.ruleType === row.ruleType && rule.ruleScript === row.ruleScript);
                });
            });
        } else {
            setPropertyRules((prevState) => {
                return prevState.filter((rule) => {
                    return rule.ruleId !== row.ruleId;
                });
            });
        }
    };

    const gridReadyHandler = (params) => {
        setGridApi(params.api);
    };

    const gridSizeChangeHandler = (param) => {
        let { api } = param;
        api.sizeColumnsToFit();
    };
    return (
        <div
            className="ag-theme-material"
            style={{
                height: "95%",
                minHeight: "150px",
            }}
        >
            <AgGridReact
                columnDefs={[
                    {
                        // field: "ruleId",
                        valueGetter: "node.rowIndex + 1",
                        headerName: "번호",
                        sortable: true,
                        filter: true,
                        cellStyle: {
                            lineHeight: "30px",
                        },
                    },
                    {
                        field: "ruleType",
                        headerName: "조건",
                        sortable: true,
                        filter: true,
                        cellStyle: {
                            lineHeight: "30px",
                        },
                    },
                    {
                        field: "ruleScript",
                        headerName: "값",
                        sortable: true,
                        filter: true,
                        cellStyle: {
                            lineHeight: "30px",
                        },
                    },
                    {
                        field: "ruleType",
                        headerName: "삭제",
                        maxWidth: 100,
                        cellStyle: {
                            lineHeight: "30px",
                        },
                        cellRenderer: "btnCellRenderer",
                        cellRendererParams: {
                            deleteHandler,
                        },
                    },
                ]}
                defaultColDef={{
                    flex: 1,
                }}
                frameworkComponents={{
                    btnCellRenderer: BtnCellRenderer,
                }}
                headerHeight={32}
                rowHeight={32}
                rowData={propertyRules ? propertyRules : []}
                onGridReady={gridReadyHandler}
                onGridSizeChanged={gridSizeChangeHandler}
            />
        </div>
    );
};

export default PropertyQualificationGrid;
