import { Router } from 'express';
import { check } from 'express-validator';
import currencyController from './controller/currency.controller.js';

const routerCurrency = new Router();

routerCurrency.post(
  '/save-currency',
  [check('name', 'can not be empty').notEmpty()],
  currencyController.saveNewCurrency
);
routerCurrency.put(
  '/edit-currency-values',
  currencyController.editCurrencyValue
);
routerCurrency.post(
  '/save-currency-values',
  currencyController.postCurrencyValue
);
routerCurrency.delete(
  '/delete-currency-values',
  currencyController.deleteCurrencyValue
);
routerCurrency.get('/currency', currencyController.getCurrency);
routerCurrency.get('/currency-names', currencyController.getCurrencysNames);

export default routerCurrency;
