import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "./App";
import { RootState } from "./app/store";
import { DatabaseGuess } from "./GuessDatabase";
import { load_guesses } from "./historySlice";
import { sortBy } from 'lodash';

const History = () => {
    const dispatch = useThunkDispatch();
    const { guesses } = useSelector((state: RootState) => state.history);
    
    useEffect(() => dispatch(load_guesses()), []);

    return (
        <ol>
            {guesses.map(guess_ui)}
        </ol>
    );
};

const guess_ui = (guess: DatabaseGuess) => {
    const last_video = guess.videos[guess.videos.length - 1];
    const tags = sortBy(last_video.tags, ["count"]);
    const title = tags[tags.length - 1].name;
    return (
        <li>
            <p>Title: <a href={"https://www.sakugabooru.com/post?tags=" + title.split(" ").join("_")}>{title}</a></p>
            <p>Guess: {guess.guess}</p>
            <p>Date: {new Date(guess.date).toDateString()}</p>
            <a href={last_video.url}><img src={last_video.preview_url} /></a>
        </li>
    );
}

export default History;