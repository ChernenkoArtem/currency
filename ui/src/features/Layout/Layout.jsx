import { useDispatch } from 'react-redux';
import { modalSlice } from '../../store/reducers/Modals';
import Button from '@mui/material/Button';

export default function Layout() {
  const dispatch = useDispatch();

  const handleOpen = () => dispatch(modalSlice.actions.openCreateModal());

  return (
    <>
      <Button variant='contained' onClick={handleOpen}>
        Add currency
      </Button>
    </>
  );
}
