import React from 'react';

const GuessResultUI = ({guess_result}: {guess_result: GuessResult | undefined}) => {
    if (guess_result === undefined) {
        return null;
    }
    if (guess_result.is_correct) {
        return <p id="guess-result" className="controls correct">{guess_result.correct_answer.replaceAll("_", " ")} &#10003;</p>
    } else {
        return (
            <div id="guess-result" className="controls wrong">
                <p id="incorrect-guess">{guess_result.guess.replaceAll("_", " ")}</p>
                <p>{guess_result.correct_answer.replaceAll("_", " ")}</p>
            </div>
        )
    }
    
}

export type GuessResult = {
    guess: string,
    correct_answer: string,
    is_correct: boolean,
}

export default GuessResultUI;