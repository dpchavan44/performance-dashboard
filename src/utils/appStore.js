import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import configSlice from './configSlice';
import dashboardData from './dashboardData';
import compareData from './compareData';
import overviewSummaryData from './OverviewSummaryData';
import filterTimingData from './filterTimingData';
import testCaseDetailsSlice from './testCaseDetailsSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
    config: configSlice,
    dashboardData: dashboardData,
    compareData: compareData,
    overviewSummaryData: overviewSummaryData,
    filterTimingData: filterTimingData,
    testCaseDetails : testCaseDetailsSlice
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const appStore = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(appStore);

export { appStore, persistor };