import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from '../appSlice';
import historyReducer from '../historySlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
