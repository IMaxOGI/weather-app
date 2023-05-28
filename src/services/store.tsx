import { configureStore } from '@reduxjs/toolkit';
import cityReducer from "./slices/CitySlice"
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

const store = configureStore({
    reducer: {
        city: cityReducer
    },
    preloadedState: persistedState
});

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;