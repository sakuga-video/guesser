import { Tag, useThunkDispatch } from './App';
import { sortBy } from 'lodash';
import Timer from './Timer';
import { show_next_tag } from './appSlice';
import { makeStyles, Paper } from '@material-ui/core';
import { MatchResult } from './GuessMatcher';

const RESULT_DISPLAY_DURATION = 4;

const useStyles = makeStyles({
    timer: {
      width: "100%",
    },
    root: {
        flexBasis: "400px",
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
            on_time_over={() => dispatch(show_next_tag())}
            type = "linear"
            className={classes.timer}
        />
    );
    return (
        <Paper id="guess-result" className={classes.root}>
            {result !== "missing" && <p>{guess}</p>}
            {result === "correct" && !is_exact && <p>({closest_answer})</p> }
            <h1>{{
                correct: "🎉 is correct 🎊",
                incorrect: "is incorrect",
                missing: "No guess",
            }[result]}</h1>
            {result !== "correct" && answer_ui(answers)}
            {timer}
        </Paper>
    )
}

const answer_ui = (answers: Tag[]) => {
    if (answers.length > 0) {
        return <p>it was {sortBy(answers, tag => tag.count)[answers.length - 1].name}</p>
    } else {
        return null;
    }
}

export default GuessResultUI;