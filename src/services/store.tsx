import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cityReducer from "./slices/сitySlice"
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
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
