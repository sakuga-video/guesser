import Fuse from "fuse.js";
import { Tag } from "./App";
import { GuessResult } from "./GuessResultUI";

export type MatchResult = {
    readonly result: GuessResult,
    readonly is_exact: boolean,
    readonly closest_answer?: string,
}

const Matches = (guess: Guess): MatchResult => {
    if (!guess.guess) {
        return {
            result: "missing",
            is_exact: false,
        };
    }
    const options = {
        includeScore: true,
        threshold: 0.1,
    };
    const fuse = new Fuse(guess.answers.map(tag => tag.name), options);
    const search_results = fuse.search(guess.guess);
    return {
        result: search_results.length > 0 ? "correct" : "incorrect",
        is_exact: search_results[0]?.score === 0,
        closest_answer: search_results[0]?.item,
    }
}

export type Guess = {
    readonly answers: Tag[],
    readonly guess?: string,
}

export default Matches;