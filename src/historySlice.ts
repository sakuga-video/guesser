import database from './GuessDatabase';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./app/store";
import { DatabaseGuess } from "./GuessDatabase";

interface HistoryState {
    readonly guesses: DatabaseGuess[],
    readonly page: number,
    readonly num_guesses: number,
}

const initialState: HistoryState = {
    guesses: [],
    page: 0,
    num_guesses: 0,
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        set_guesses: (state, action: PayloadAction<{page: number, guesses: DatabaseGuess[]}>) => {
            state.guesses = action.payload.guesses;
            state.page = action.payload.page;
        },
        set_num_guesses: (state, action: PayloadAction<number>) => {
            state.num_guesses = action.payload;
        },
    }
});

export const {
    set_guesses,
    set_num_guesses,
} = historySlice.actions;

export const load_num_pages = (): AppThunk => dispatch => {
    database.guesses.count()
        .then(count => dispatch(set_num_guesses(count)));
}

type Page = { page: number, page_size: number };

export const load_guesses =
    ({ page, page_size }: Page): AppThunk =>
    dispatch => {
        database.guesses
            .orderBy("date")
            .reverse()
            .offset(page * page_size)
            .limit(page_size)
            .toArray()
            .then(guesses => dispatch(set_guesses({page, guesses})));
    }

export default historySlice.reducer;