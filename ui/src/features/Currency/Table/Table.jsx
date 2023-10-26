import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { currencyService } from '../../../services/currency.service';
import { useParams } from 'react-router-dom';
import { modalSlice } from '../../../store/reducers/Modals';
import { currencySlice } from '../../../store/reducers/Currency';

export default function TableCurrency({ columns, data }) {
  let { name } = useParams();
  const dispatch = useDispatch();
  const [deleteValue] = currencyService.useDeleteCurrencyValuesMutation();
  console.log('data', data);

  const deleteCB = async (value) => {
    await deleteValue({
      name,
      valueId: value._id,
    });
  };

  const openValueModal = () => {
    console.log('openValuesModal');
    dispatch(modalSlice.actions.openEditValueModal());
  };

  const setCurrentValue = (value) => {
    dispatch(currencySlice.actions.setEditValue(value));
  };

  const commonColumns = columns || [
    {
      name: 'Amount in USDT',
      field: 'amount',
      type: 'string',
    },
    {
      name: 'Time',
      field: 'time',
      type: 'string',
    },
    {
      name: 'Actions',
      field: 'actions',
      type: 'actions',
      actions: [
        {
          label: 'edit',
          color: 'secondary',
          command: (value) => {
            setCurrentValue(value);
            openValueModal();
          },
        },
        {
          label: 'delete',
          color: 'warning',
          command: deleteCB,
        },
      ],
    },
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              {commonColumns.map((column) => (
                <TableCell key={column.field}>{column.field}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length >= 1 &&
              data.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {commonColumns.map((column) => (
                    <TableCell key={column.field} align='left'>
                      {row[column.field]}
                      {column.type === 'actions' &&
                        column.actions.map((action) => (
                          <Button
                            onClick={() => action.command(row)}
                            color={action.color}
                          >
                            {action.label}
                          </Button>
                        ))}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
