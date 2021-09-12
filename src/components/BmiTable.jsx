import "./BmiTable.scss";

import React from 'react'
import Spinner from 'components/spinner'
import { useAuthData } from 'hooks/authData'
import { useBmiHistory } from 'hooks/useBmiHistory'
import { Table, Button } from 'react-bootstrap'
import { useTable } from 'react-table'
import { usePsAlert } from 'hooks/usePsAlert'


const Tabela = ({ columns, data, rowClick }) => {
   const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
   } = useTable({
      columns,
      data
   })
   const { authData } = useAuthData();
   const { removeBmiItem, isRemoving } = useBmiHistory({ userID: authData.data.id });
   const DelAlert = usePsAlert( {
      title:<h3>Atention!</h3>,
      body:<p>Confirm deleting!</p>,
      buttons:[ 
         { text: "Cancel",  variant: "secondary", value: false },
         { text: " Delete ",variant: "primary",   value: true },
      ]
   });

   const cellRender = (cell, row) => {
      if (cell.column.Header === "Delete") {
         return (<Button variant="danger" size="sm" onClick={() => DelAlert.show( () => removeBmiItem({ id: cell.value }) )} >X</Button>);
      }
      return cell.render('Cell');
   }

   return (
      <>
         <DelAlert.Tag />

         {(isRemoving) && <Spinner />}
         <Table className="bmiTable" striped hover size="sm"  {...getTableProps()}>
            <thead>
               {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                     {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                     ))}
                  </tr>
               ))}
            </thead>
            <tbody {...getTableBodyProps()}>
               {rows.map((row, i) => {
                  prepareRow(row)
                  return (
                     <tr {...row.getRowProps()} onClick={() => rowClick({ ...row.values })}>
                        {row.cells.map(cell => {
                           return <td {...cell.getCellProps()}>{cellRender(cell, row)}</td>
                        })}
                     </tr>
                  )
               })}
            </tbody>
         </Table>
      </>
   )
}

const BmiTable = (props) => {
   const { data, rowClick } = props;
   const columns = React.useMemo(
      () => [
         {
            Header: 'Age',
            accessor: 'age',
         },
         {
            Header: 'Gender',
            accessor: 'gender',
         },
         {
            Header: 'Height',
            accessor: 'height',
         },
         {
            Header: 'Weight',
            accessor: 'weight',
         },
         {
            Header: 'BMI',
            accessor: 'bmic',
         },
         {
            Header: 'Date',
            accessor: 'ms_date_time',
         },
         {
            Header: 'Delete',
            accessor: 'id',
         }
      ], []
   );

   return (
      <Tabela columns={columns} data={data} rowClick={rowClick} />
   )
}

export default BmiTable;
