import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { environment } from '../environment/environment';

export const currencyService = createApi({
  reducerPath: 'currencyAPI',
  baseQuery: fetchBaseQuery({ baseUrl: environment.apiURL }),
  tagTypes: ['currency'],
  endpoints: (build) => ({
    getCurrencyByName: build.query({
      query: (name) => ({
        url: '/currency',
        params: {
          name,
        },
      }),
      providesTags: (result) => ['currency'],
    }),
    getCurrencyNamesList: build.query({
      query: () => ({
        url: '/currency-names',
      }),
      providesTags: (result) => ['currency'],
    }),
    createCurrency: build.mutation({
      query: (currency) => ({
        url: '/save-currency',
        method: 'POST',
        body: currency,
      }),
      invalidatesTags: ['currency'],
    }),
    updateCurrencyValue: build.mutation({
      query: ({ name, value }) => ({
        url: '/edit-currency-values',
        method: 'PUT',
        body: value,
        params: {
          name,
        },
      }),
      invalidatesTags: ['currency'],
    }),
    saveCurrencyValues: build.mutation({
      query: ({ name, value }) => ({
        url: '/save-currency-values',
        method: 'POST',
        body: value,
        params: {
          name,
        },
      }),
      invalidatesTags: ['currency'],
    }),
    deleteCurrencyValues: build.mutation({
      query: ({ name, valueId }) => ({
        url: '/delete-currency-values',
        method: 'DELETE',
        params: {
          name,
          valueId,
        },
      }),
      invalidatesTags: ['currency'],
    }),
  }),
});
