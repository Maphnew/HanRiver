import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteBtnCellRenderer from "../../../../components/DeleteBtnCellRenderer";
import propertyService from "../../../../services/property-service";
import { setProperties } from "../../../../redux/slices/meta-class-slice";

const BtnCellRenderer = (props) => {
    const btnClickHandler = () => {
        props.deletePropertyHandler(props.data);
    };
    return <DeleteBtnCellRenderer title={"Sure to delete?"} btnClickHandler={btnClickHandler} />;
};

const PropertyGrid = (props) => {
    const { rowClickHandler } = props;
    const [gridApi, setGridApi] = useState(null);
    const properties = useSelector((state) => state.metaClassManagement.properties);
    const dispatch = useDispatch();
    const deletePropertyHandler = async (property) => {
        const result = await propertyService.deleteProperty(property.propertyId);
        if (result && result.success) {
            alert(result.response.message);
            dispatch(setProperties(properties.filter((ppty) => ppty.propertyId !== property.propertyId)));
        }
    };
    const gridReadyHandler = (params) => {
        setGridApi(params.api);
    };
    const gridSizeChangeHandler = (params) => {
        let { api } = params;
        api.sizeColumnsToFit();
    };
    return (
        <div
            className="ag-theme-material"
            style={{
                height: "95%",
                minHeight: "200px",
            }}
        >
            <AgGridReact
                columnDefs={[
                    {
                        field: "propertySeq",
                        headerName: "PROPERTY순서",
                        sortable: true,
                        filter: true,
                        cellStyle: {
                            lineHeight: "30px",
                        },
                    },
                    {
                        field: "propertyName",
                        headerName: "PROPERTY명",
                        sortable: true,
                        filter: true,
                        cellStyle: {
                            lineHeight: "30px",
                        },
                    },
                    {
                        field: "columnName",
                        headerName: "변수명",
                        sortable: true,
                        filter: true,
                        cellStyle: {
                            lineHeight: "30px",
                        },
                    },
                    {
                        field: "propertyName",
                        headerName: "삭제",
                        maxWidth: 100,
                        cellStyle: {
                            lineHeight: "30px",
                        },
                        cellRenderer: "btnCellRenderer",
                        cellRendererParams: {
                            deletePropertyHandler,
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
                rowData={properties}
                onGridReady={gridReadyHandler}
                onRowClicked={rowClickHandler}
                onGridSizeChanged={gridSizeChangeHandler}
            />
        </div>
    );
};

export default PropertyGrid;
