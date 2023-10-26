import { combineReducers, configureStore } from '@reduxjs/toolkit';
import currencyReducer from './reducers/Currency';
import modalReducer from './reducers/Modals';
import { currencyService } from '../services/currency.service';

const rootReducer = combineReducers({
  currencyReducer,
  modalReducer,
  [currencyService.reducerPath]: currencyService.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(currencyService.middleware),
  });
};
