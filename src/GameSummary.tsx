import { Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { choose_random_tags, Tag, useThunkDispatch } from "./App";
import { start } from "./appSlice";
import Matches, { Guess } from "./GuessMatcher";
import { Video } from "./VideoWrapper";

export type GameSummaryProps = {
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
    return "Guess \"" + guess.guess + "\" " + (Matches(guess).matches ? "🎉 was correct 🎊" : "was incorrect");
}

const video_thumbnails = (videos: Video[]) =>
    videos.map(video =>
        <li key={video.id}>
            <a href={SAKUGABOORU_VIDEO_URL + video.id}>
                <img className="thumbnail" alt={"Thumbnail preview of " + video.tags[0].name} src={video.preview_url} />
            </a>
        </li>
    )

const round_summary = (round: Round, index: number) => {
    return (
        <Grid key={index} item className="round-summary">
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        title={"Image thumbnail of a clip from " + round.videos[0].tags[0].name}
                        alt={"Image thumbnail of a clip from " + round.videos[0].tags[0].name}
                        image={round.videos[0].preview_url}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            <a href={SAKUGABOORU_TAG_URL + round.tag.name.replaceAll(" ", "_")}>{round.tag.name}</a>
                        </Typography>
                        <Typography variant="body2" component="p">
                            {render_guess(round.guess)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

const GameSummary = ({rounds, all_tags}: GameSummaryProps) => {
    const dispatch = useThunkDispatch();

    return (
        <Container id="game-summary" maxWidth="lg">
            <Grid container spacing={2}>
                {rounds.map(round_summary)}
            </Grid>
            <Button variant="contained" onClick={() => dispatch(start(choose_random_tags(all_tags)))}>Play Again</Button>
        </Container>
    )
}

export default GameSummary;