import database from './GuessDatabase';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./app/store";
import { DatabaseGuess } from "./GuessDatabase";

interface HistoryState {
    readonly guesses: DatabaseGuess[],
}

const initialState: HistoryState = {
    guesses: [],
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        show_guesses: (state, action: PayloadAction<DatabaseGuess[]>) => {
            state.guesses = action.payload;
        }
    }
});

export const {
    show_guesses,
} = historySlice.actions;

export const load_guesses = (): AppThunk => dispatch => {
    database.guesses.toArray()
        .then(guesses => dispatch(show_guesses(guesses)));
}

export default historySlice.reducer;