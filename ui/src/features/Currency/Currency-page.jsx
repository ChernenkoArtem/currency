import './Currency-page.scss';
import { useDispatch } from 'react-redux';
import { Select, Button, MenuItem } from '@mui/material';
import { modalSlice } from '../../store/reducers/Modals';
import { currencyService } from '../../services/currency.service';
import { useParams, useNavigate } from 'react-router-dom';
import ValuesModal from './Values-modal/Values-modal';
import EditValuesModal from './Edit-values-modal/Edit-values-modal';
import TableCurrency from './Table/Table';
import Chart from './Chart/Chart';

export default function CurrencyPage() {
  let { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: currencyNames } =
    currencyService.useGetCurrencyNamesListQuery();
  const { data: selectedCurrency } =
    currencyService.useGetCurrencyByNameQuery(name);

  function navigeteToCurrency(name) {
    navigate(`/currency/${name}`);
  }

  const openCurrencyModal = (e) => {
    e.stopPropagation();
    dispatch(modalSlice.actions.openCreateModal());
  };

  const openValuesModal = () => {
    console.log('openValuesModal');
    dispatch(modalSlice.actions.openCreateValuesModal());
  };

  return (
    <div>
      <header className='currency-header'>
        <div className='set-currency'>
          <img
            className='image'
            alt='fdfds'
            src={selectedCurrency && selectedCurrency.data.image}
          />
          <Select
            defaultValue={name}
            sx={{ color: '#fff', '& .MuiSelect-icon': { color: '#fff' } }}
          >
            <MenuItem>
              <Button onClick={openCurrencyModal}>+Add Curency</Button>
            </MenuItem>
            {currencyNames &&
              currencyNames.data.map((value) => (
                <MenuItem
                  key={value}
                  value={value}
                  onClick={() => navigeteToCurrency(value)}
                >
                  {value}
                </MenuItem>
              ))}
          </Select>
        </div>
        <div className='current-amount'>10$</div>
        <Button variant='contained' onClick={openValuesModal}>
          +Add Values
        </Button>
      </header>

      {selectedCurrency && (
        <>
          <Chart data={selectedCurrency.data}></Chart>
          <TableCurrency data={selectedCurrency?.data.values}></TableCurrency>
        </>
      )}

      <ValuesModal></ValuesModal>
      <EditValuesModal></EditValuesModal>
    </div>
  );
}
