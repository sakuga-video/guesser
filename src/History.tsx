import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "./App";
import { RootState } from "./app/store";
import { load_num_rounds } from "./historySlice";
import { Container, makeStyles } from "@material-ui/core";
import Navigation from "./Navigation";
import { useParams } from "react-router-dom";
import PagedRoundSummaries from "./PagedRoundSummaries";
import RoundDetailsLoader from "./RoundDetailsLoader";

const useStyles = makeStyles({
    container: {
        paddingBottom: 56,
    }
})

const History = () => {
    const dispatch = useThunkDispatch();
    useEffect(() => dispatch(load_num_rounds()), [dispatch]);
    const { num_rounds } = useSelector((state: RootState) => state.history);
    const { id } = useParams<{id: string | undefined}>();
    const classes = useStyles();

    const get_history_ui = () => {
        if (num_rounds === 0) {
            return <h1>No game history</h1>;
        }
        if (id !== undefined) {
            return <RoundDetailsLoader round_id={parseInt(id)} />;
        }
        return <PagedRoundSummaries />;
    }

    return (
        <React.Fragment>
            <Container className={classes.container}>
                {get_history_ui()}
            </Container>
            <Navigation />
        </React.Fragment>
    )
};

export default History;