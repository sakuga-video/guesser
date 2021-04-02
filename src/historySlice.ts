import database from './GameDatabase';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./app/store";
import { Round } from "./GameDatabase";

interface HistoryState {
    readonly rounds: Round[],
    readonly page: number,
    readonly num_rounds: number,
}

const initialState: HistoryState = {
    rounds: [],
    page: 0,
    num_rounds: 0,
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        set_rounds: (state, action: PayloadAction<{page: number, rounds: Round[]}>) => {
            state.rounds = action.payload.rounds;
            state.page = action.payload.page;
        },
        set_num_rounds: (state, action: PayloadAction<number>) => {
            state.num_rounds = action.payload;
        },
    }
});

export const {
    set_rounds,
    set_num_rounds,
} = historySlice.actions;

export const load_num_pages = (): AppThunk => dispatch => {
    database.rounds.count()
        .then(count => dispatch(set_num_rounds(count)));
}

type Page = { page: number, page_size: number };

export const load_rounds =
    ({ page, page_size }: Page): AppThunk =>
    dispatch => {
        database.rounds
            .orderBy("date")
            .reverse()
            .offset(page * page_size)
            .limit(page_size)
            .toArray()
            .then(rounds => dispatch(set_rounds({page, rounds})));
    }

export default historySlice.reducer;