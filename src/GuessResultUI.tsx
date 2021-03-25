import { Tag, useThunkDispatch } from './App';
import { Guess, MatchResult } from './GuessMatcher';
import { sortBy } from 'lodash';
import Timer from './Timer';
import { show_next_tag } from './appSlice';
import { makeStyles } from '@material-ui/core';

const RESULT_DISPLAY_DURATION = 4;

const useStyles = makeStyles({
    timer: {
      width: "100%",
    },
});

const GuessResultUI = ({guess_result}: {guess_result: GuessResult }) => {
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

    if (guess_result.match_result.matches && guess_result.guess.guess) {
        return (
            <div id="guess-result" className="controls correct">
                <p>{guess_result.guess.guess}</p>
                {
                    !guess_result.match_result.exact &&
                    <p>({guess_result.match_result.closest})</p>
                }
                <h1>🎉 is correct 🎊</h1>
                {timer}
            </div>
        )
    } else if (guess_result.guess.guess) {
        return (
            <div id="guess-result" className="controls wrong">
                <p id="incorrect-guess">{guess_result.guess.guess}</p>
                <h1>is incorrect</h1>
                {answer_ui(guess_result.guess.answers)}
                {timer}
            </div>
        );
    } else {
        return (
            <div id="guess-result" className="controls wrong">
                <h1>No guess</h1>
                {answer_ui(guess_result.guess.answers)}
                {timer}
            </div>
        );
    }
}

const answer_ui = (answers: Tag[]) => {
    if (answers.length > 0) {
        return <p>it was {sortBy(answers, tag => tag.count)[answers.length - 1].name}</p>
    } else {
        return null;
    }
}

export type GuessResult = {
    guess: Guess,
    match_result: MatchResult,
}

export default GuessResultUI;