import database from './GameDatabase';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./app/store";
import { Round } from "./GameDatabase";

interface HistoryState {
    readonly rounds: Round[],
    readonly page: number,
    readonly num_rounds: number,
    readonly active_round?: Round,
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
        set_active_round: (state, action: PayloadAction<Round | undefined>) => {
            state.active_round = action.payload;
        }
    }
});

export const {
    set_rounds,
    set_num_rounds,
    set_active_round,
} = historySlice.actions;

export const load_num_rounds = (): AppThunk => dispatch => {
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

export const load_round_details =
    (round_id: number): AppThunk =>
    dispatch => {
        database.rounds
            .where(":id")
            .equals(round_id)
            .first()
            .then(round => dispatch(set_active_round(round)));
    }

export default historySlice.reducer;