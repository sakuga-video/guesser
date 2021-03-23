import { Button } from "@material-ui/core";
import { choose_random_tags, Tag, useThunkDispatch } from "./App";
import { start } from "./appSlice";
import Matches, { Guess } from "./GuessMatcher";
import { Video } from "./VideoWrapper";

type Props = {
    rounds: Round[],
    all_tags: Tag[],
};

export type Round = {
    tag: Tag,
    videos: Video[],
    guess: Guess,
}

const SAKUGABOORU_URL = "https://www.sakugabooru.com/post";
const SAKUGABOORU_VIDEO_URL = SAKUGABOORU_URL + "/show/";
const SAKUGABOORU_TAG_URL = SAKUGABOORU_URL + "?tags=";

const render_guess = (guess: Guess) => {
    if (!guess.guess) {
        return "No guess";
    }
    return "Guess " + guess.guess + " " + (Matches(guess).matches ? "🎉 was correct 🎊" : "was incorrect");
}

const video_thumbnails = (videos: Video[]) =>
    videos.map(video =>
        <li key={video.id}>
            <a href={SAKUGABOORU_VIDEO_URL + video.id}>
                <img className="thumbnail" alt={"Thumbnail preview of " + video.tags[0]} src={video.preview_url} />
            </a>
        </li>
    )

const round_summary = (round: Round, index: number) => {
    return (
        <li key={index}>
            <h1 className="show-title"><a href={SAKUGABOORU_TAG_URL + round.tag.name.replaceAll(" ", "_")}>{round.tag.name}</a></h1>
            <p className="guess">{render_guess(round.guess)}</p>
            <ol className="video-thumbnails">
                {video_thumbnails(round.videos)}
            </ol>
        </li>
    );
}

const GameSummary = ({rounds, all_tags}: Props) => {
    const dispatch = useThunkDispatch();

    return (
        <div id="game-summary">
            <ol id="round-summary">
                {rounds.map(round_summary)}
            </ol>
            <Button variant="contained" onClick={() => dispatch(start(choose_random_tags(all_tags)))}>Restart</Button>
        </div>
    )
}

export default GameSummary;