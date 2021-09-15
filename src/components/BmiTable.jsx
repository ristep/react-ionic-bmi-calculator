import "./BmiTable.scss";

import React, { useState } from "react";
import Spinner from "components/spinner";
import { useAuthData } from "hooks/authData";
import { useTable } from "react-table";
import { IonBadge} from "@ionic/react";
import { ConfirmDialog } from "components/ConfirmDialog";
import { useRemoveBmiHistoryRecord } from "hooks/useBmiHistory";
import { useQueryClient } from "react-query";

const DelAlertInit = {
  show: false,
  record_id: null,
  title: "Atention!",
  body: "Confirm deleting!",
  callback: () => {},
  buttons: [
    { text: "Cancel", color: "light", value: false },
    { text: " Delete ", color: "danger", value: true },
  ],
};

const Tabela = ({ columns, data, rowClick }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });
  const { authData } = useAuthData();
  const [ delAlData, setDelAlData ] = useState({...DelAlertInit }); 
  const queryClient = useQueryClient();

  const { delBmiHistory, isLoading } = useRemoveBmiHistoryRecord( authData.data.id );

  const confirmDelete = (record_id) => {
    setDelAlData({...delAlData, show:true, record_id, callback: () => delBmiHistory( record_id ) });
    queryClient.invalidateQueries('bmiGetHistoryQuery');
  };

  const cellRender = (cell, row) => {
    if (cell.column.Header === "Delete") {
      return (
        <IonBadge color="danger" size="small" onClick={() => confirmDelete(cell.value)}>X</IonBadge>
      );
    }
    return cell.render("Cell");
  };

  return (
    <>
      {isLoading && <Spinner />}

      <ConfirmDialog {...delAlData} hide={()=>setDelAlData({...delAlData, show:false})} />

      <table className="bmiTable" striped hover size="sm" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} onClick={() => rowClick({ ...row.values })}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cellRender(cell, row)}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const BmiTable = (props) => {
  const { data, rowClick } = props;
  const columns = React.useMemo(
    () => [
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Height",
        accessor: "height",
      },
      {
        Header: "Weight",
        accessor: "weight",
      },
      {
        Header: "BMI",
        accessor: "bmic",
      },
      {
        Header: "Date",
        accessor: "ms_date_time",
      },
      {
        Header: "Delete",
        accessor: "id",
      },
    ],
    []
  );

  return <Tabela columns={columns} data={data} rowClick={rowClick} />;
};

export default BmiTable;
