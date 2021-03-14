import React from 'react';

const GuessResultUI = ({guess_result}: {guess_result: GuessResult | undefined}) => {
    if (guess_result === undefined) {
        return null;
    }
    if (guess_result.is_correct && guess_result.guess) {
        return (
            <div id="guess-result" className="controls correct">
                <p>{guess_result.guess.replaceAll("_", " ")}</p>
                {
                    guess_result.guess !== guess_result.correct_answer &&
                    <p>({guess_result.correct_answer.replaceAll("_", " ")})</p>
                }
                <h1>🎉 is correct 🎊</h1>
            </div>
        )
    } else if (guess_result.guess) {
        return (
            <div id="guess-result" className="controls wrong">
                <p id="incorrect-guess">{guess_result.guess.replaceAll("_", " ")}</p>
                <h1>is incorrect</h1>
                <p>It was {guess_result.correct_answer.replaceAll("_", " ")}</p>
            </div>
        );
    } else {
        return (
            <div id="guess-result" className="controls wrong">
                <h1>No guess</h1>
                <p>It was {guess_result.correct_answer.replaceAll("_", " ")}</p>
            </div>
        );
    }
    
}

export type GuessResult = {
    guess?: string,
    correct_answer: string,
    is_correct: boolean,
}

export default GuessResultUI;