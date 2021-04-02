import { Tag, useThunkDispatch } from './App';
import { sortBy } from 'lodash';
import Timer from './Timer';
import { stop_showing_guess_results } from './appSlice';
import { Container, makeStyles, Paper, Typography } from '@material-ui/core';
import { MatchResult } from './GuessMatcher';
import React from 'react';

const RESULT_DISPLAY_DURATION = 4;

const useStyles = makeStyles({
    timer: {
      width: "100%",
    },
    root: {
        width:400,
        height:200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
});

export type GuessResult = "correct" | "missing" | "incorrect";

export interface GuessResultUIProps extends MatchResult {
    readonly guess?: string,
    readonly answers: Tag[],
}

const GuessResultUI = ({guess, answers, closest_answer, result, is_exact}: GuessResultUIProps) => {
    const dispatch = useThunkDispatch();
    const classes = useStyles();

    const timer = (
        <Timer
            duration={RESULT_DISPLAY_DURATION}
            on_time_over={() => dispatch(stop_showing_guess_results())}
            type = "linear"
            className={classes.timer}
        />
    );
    return (
        <Paper>
            <Container className={classes.root}>
                {result !== "missing" && <Typography variant="body1">{guess}</Typography>}
                {result === "correct" && !is_exact && <Typography variant="body1">({closest_answer})</Typography> }
                <Typography variant="h3" component="p">{{
                    correct: "🎉 is correct 🎊",
                    incorrect: "is incorrect",
                    missing: "No guess",
                }[result]}</Typography>
                {result !== "correct" && answer_ui(answers)}
            </Container>
            {timer}
        </Paper>
    )
}

const answer_ui = (answers: Tag[]) => {
    if (answers.length > 0) {
        return <Typography variant="body1">it was {sortBy(answers, tag => tag.count)[answers.length - 1].name}</Typography>
    } else {
        return null;
    }
}

export default GuessResultUI;