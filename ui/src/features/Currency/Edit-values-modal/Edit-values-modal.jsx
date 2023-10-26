import './Edit-values-modal.scss';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { currencyService } from '../../../services/currency.service';
import { modalSlice } from '../../../store/reducers/Modals';
import { useParams } from 'react-router-dom';

export default function EditValuesModal() {
  let { name } = useParams();

  const modalStatus = useSelector(
    (state) => state.modalReducer.currencyValusesEdit
  );
  const valueBeforeEdit = useSelector(
    (state) => state.currencyReducer.currentEditValue
  );

  const dispatch = useDispatch();
  const [editValue, {}] = currencyService.useUpdateCurrencyValueMutation();

  const handleClose = () => dispatch(modalSlice.actions.closeEditValueModal());

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = {
      amount: data.get('amount'),
      time: data.get('time'),
      _id: valueBeforeEdit._id,
    };
    try {
      await editValue({ name, value: result });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        open={modalStatus}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className='modal__wrapp'>
          <Typography component='h1' variant='h5'>
            Currency Modal
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='amount'
              label='Amount'
              name='amount'
              defaultValue={valueBeforeEdit?.amount}
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='time'
              label='Time'
              name='time'
              defaultValue={valueBeforeEdit?.time}
            />
            <div className='actions'>
              <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
                Save
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
