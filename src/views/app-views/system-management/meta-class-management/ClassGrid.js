import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";

import DeleteBtnCellRenderer from "../../../../components/DeleteBtnCellRenderer";
import metaClassService from "../../../../services/meta-class-service";
import { setClasses, setProperties, setSelectedClass } from "../../../../redux/slices/meta-class-slice";

const BtnCellRenderer = (props) => {
    const btnClickHandler = () => {
        props.deleteClassHandler(props.data);
    };
    return <DeleteBtnCellRenderer title={"Sure to delete?"} btnClickHandler={btnClickHandler} />;
};

const ClassGrid = (props) => {
    const [gridApi, setGridApi] = useState(null);
    const classes = useSelector((state) => state.metaClassManagement.classes);
    const dispatch = useDispatch();
    const gridReadyHandler = (params) => {
        setGridApi(params.api);
    };
    const rowClickHandler = async (params) => {
        const metaClass = await metaClassService.getProperties(params.data.classId);
        if (metaClass && metaClass.success) {
            dispatch(setSelectedClass(metaClass.response));
            dispatch(setProperties(metaClass.response.mclassPropertyList));
        }
    };
    const gridSizeChangedHandler = (params) => {
        let { api } = params;
        api.sizeColumnsToFit();
    };
    const deleteClassHandler = async (data) => {
        if (!data.classId) {
            return;
        }
        const deleteConfirm = window.confirm("삭제하시겠습니까?");
        if (!deleteConfirm) {
            return;
        }
        const result = await metaClassService.deleteMetaClass(data.classId);
        if (result && result.success) {
            const filteredClasses = classes.filter((metaClass) => metaClass.classId !== data.classId);
            dispatch(setClasses(filteredClasses));
        }
    };
    return (
        <div
            className="ag-theme-material app-grid-card"
            style={{
                flex: "1 1 400px",
            }}
        >
            <AgGridReact
                columnDefs={[
                    {
                        field: "classId",
                        headerName: "CLASSID",
                        sortable: true,
                        filter: true,
                        cellStyle: { lineHeight: "30px" },
                    },
                    {
                        field: "className",
                        headerName: "CLASS명",
                        sortable: true,
                        filter: true,
                        cellStyle: { lineHeight: "30px" },
                    },
                    {
                        field: "classTypeName",
                        headerName: "CLASS종류",
                        sortable: true,
                        filter: true,
                        cellStyle: { lineHeight: "30px" },
                    },
                    {
                        field: "classId",
                        headerName: "삭제",
                        maxWidth: 150,
                        cellStyle: { lineHeight: "30px" },
                        cellRenderer: "btnCellRenderer",
                        cellRendererParams: {
                            deleteClassHandler,
                        },
                    },
                ]}
                defaultColDef={{
                    flex: 1,
                    resizable: true,
                }}
                frameworkComponents={{
                    btnCellRenderer: BtnCellRenderer,
                }}
                rowData={classes}
                onGridReady={gridReadyHandler}
                onRowClicked={rowClickHandler}
                onGridSizeChanged={gridSizeChangedHandler}
            />
        </div>
    );
};

export default ClassGrid;
