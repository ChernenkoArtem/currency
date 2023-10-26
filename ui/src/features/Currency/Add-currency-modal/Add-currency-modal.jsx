import './Add-currency-modal.scss';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { toBase64 } from '../../../utils/utils';
import { currencyService } from '../../../services/currency.service';
import { modalSlice } from '../../../store/reducers/Modals';

export default function AddCurrencyModal() {
  const modalStatus = useSelector((state) => state.modalReducer.currencyCreate);
  const dispatch = useDispatch();
  const [createCurrency, {}] = currencyService.useCreateCurrencyMutation();
  const navigate = useNavigate();

  const handleClose = () => dispatch(modalSlice.actions.closeCreateModal());

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = {
      name: data.get('name'),
      image: null,
    };
    try {
      const image = await toBase64(data.get('image'));
      result.image = image;
      await createCurrency(result);
      navigate(`/currency/${result.name}`);
      console.log(result);
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
              id='name'
              label='Name'
              name='name'
              autoFocus
            />
            <Button variant='contained' component='label'>
              Add image
              <input type='file' name='image' hidden />
            </Button>
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
