import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "./App";
import { RootState } from "./app/store";
import { load_num_rounds } from "./historySlice";
import { Container, makeStyles } from "@material-ui/core";
import Navigation from "./Navigation";
import PagedRoundSummaries from "./PagedRoundSummaries";


const useStyles = makeStyles({
    container: {
        paddingBottom: 56,
    }
})

const History = () => {
    const dispatch = useThunkDispatch();
    useEffect(() => dispatch(load_num_rounds()), [dispatch]);
    const { num_rounds } = useSelector((state: RootState) => state.history);
    const classes = useStyles();

    return (
        <React.Fragment>
            <Container className={classes.container}>
                {num_rounds > 0 ? <PagedRoundSummaries /> : <h1>No game history</h1>}
            </Container>
            <Navigation />
        </React.Fragment>
    )
};

export default History;