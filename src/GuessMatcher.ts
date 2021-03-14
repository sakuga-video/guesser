import { GuessResult } from "./GuessResultUI";
import Fuse from "fuse.js";

const Matches = (guess: Guess) => {
    const options = {
        includeScore: true,
        threshold: 0.1,
        distance: 0,
      };
    const fuse = new Fuse([guess.answer], options);
    const search = fuse.search(guess.guess);
    return search.length > 0;
}

export type Guess = {
    answer: string,
    guess: string,
}

export default Matches;