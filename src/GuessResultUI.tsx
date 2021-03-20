import React from 'react';
import { Tag } from './App';
import { Guess, MatchResult } from './GuessMatcher';

const GuessResultUI = ({guess_result}: {guess_result: GuessResult }) => {
    if (guess_result.match_result.matches && guess_result.guess.guess) {
        return (
            <div id="guess-result" className="controls correct">
                <p>{guess_result.guess.guess}</p>
                {
                    !guess_result.match_result.exact &&
                    <p>({guess_result.match_result.closest})</p>
                }
                <h1>🎉 is correct 🎊</h1>
            </div>
        )
    } else if (guess_result.guess.guess) {
        return (
            <div id="guess-result" className="controls wrong">
                <p id="incorrect-guess">{guess_result.guess.guess}</p>
                <h1>is incorrect</h1>
                {answer_ui(guess_result.guess.answers)}
            </div>
        );
    } else {
        return (
            <div id="guess-result" className="controls wrong">
                <h1>No guess</h1>
                {answer_ui(guess_result.guess.answers)}
            </div>
        );
    }
    
}

const answer_ui = (answers: Tag[]) => {
    if (answers.length > 0) {
        return <p>it was {answers.sort(tag => tag.count)[0].name}</p>
    } else {
        return null;
    }
}

export type GuessResult = {
    guess: Guess,
    match_result: MatchResult,
}

export default GuessResultUI;