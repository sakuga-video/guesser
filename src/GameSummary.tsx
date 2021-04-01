import { Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { Tag, useThunkDispatch } from "./App";
import { start } from "./appSlice";
import Matches, { Guess } from "./GuessMatcher";
import { Video } from "./VideoWrapper";
import { choose_random_tags } from './StartButton';

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
export const SAKUGABOORU_TAG_URL = SAKUGABOORU_URL + "?tags=";

const render_guess = (guess: Guess) => {
    const match_result = Matches(guess);
    const guess_string = "\"" + guess.guess + "\" ";
    return {
        missing: "No guess",
        correct: guess_string + "🎉 was correct 🎊",
        incorrect: guess_string + "was incorrect",
    }[match_result.result]
}

const useCardStyles = makeStyles({
    root: {
        minHeight: 250,
    }
});

const useContainerStyles = makeStyles({
    root: {
        paddingBottom:56,
    }
});

const GameSummary = ({rounds, all_tags}: GameSummaryProps) => {
    const dispatch = useThunkDispatch();
    const card_classes = useCardStyles();
    const container_classes = useContainerStyles();

    const round_summary = (round: Round, index: number) => {
        return (
            <Grid key={index} item className="round-summary" xs={12} sm={6} md={4}>
                <Card classes={card_classes}>
                    <CardActionArea href={SAKUGABOORU_TAG_URL + round.tag.name.split(" ").join("_")} target="_blank">
                        <CardMedia
                            component="img"
                            title={"Image thumbnail of a clip from " + round.videos[0].tags[0].name}
                            alt={"Image thumbnail of a clip from " + round.videos[0].tags[0].name}
                            image={round.videos[0].preview_url}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {round.tag.name}
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

    return (
        <Container classes={container_classes}>
            <Typography variant="h3" component="h1" gutterBottom align="center">Game Summary</Typography>
            <div id="play-again">
                <Button
                    variant="contained"
                    onClick={() => dispatch(start(choose_random_tags(all_tags)))}
                    color="primary"
                >
                        Play Again
                </Button>
            </div>
            <Grid container spacing={2}>
                {rounds.map(round_summary)}
            </Grid>
        </Container>
    )
}

export default GameSummary;