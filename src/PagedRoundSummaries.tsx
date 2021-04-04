import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "./App";
import { RootState } from "./app/store";
import { load_rounds, load_num_rounds } from "./historySlice";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";
import RoundSummaries from "./RoundSummaries";

const PAGE_SIZE = 12;

const useStyles = makeStyles({
    pagination: {
        margin: "1em 0",
    },
})

const PagedRoundSummaries = () => {
    const dispatch = useThunkDispatch();
    const { rounds, num_rounds, page } = useSelector((state: RootState) => state.history);
    const classes = useStyles();

    useEffect(() => dispatch(load_num_rounds()), [dispatch]);
    useEffect(() => dispatch(load_rounds({ page: 0, page_size: PAGE_SIZE })), [dispatch]);

    const on_page_change = (_: React.ChangeEvent<unknown>, page: number) => {
        dispatch(load_rounds({ page: page - 1, page_size: PAGE_SIZE }));
    }

    return (
        <React.Fragment>
            <RoundSummaries rounds={rounds} />
            <Pagination
                className={classes.pagination}
                page={page + 1}
                count={Math.ceil(num_rounds / PAGE_SIZE)}
                onChange={on_page_change}
            />
        </React.Fragment>
    );
};

export default PagedRoundSummaries;