import './App.css';
import { Outlet } from 'react-router-dom';
import Layout from './features/Layout/Layout';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import AddCurrencyModal from './features/Currency/Add-currency-modal/Add-currency-modal';

function App() {
  // const { count } = useSelector((state) => state.currencyReducer);
  // const { incremant } = currencySlice.actions;
  const store = setupStore();
  return (
    <Provider store={store}>
      <div className='app'>
        <Outlet></Outlet>
        <AddCurrencyModal></AddCurrencyModal>
      </div>
    </Provider>
  );
}

export default App;
