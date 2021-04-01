import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Tag, useThunkDispatch } from "./App";
import { RootState } from "./app/store";
import { DatabaseGuess } from "./GuessDatabase";
import { load_guesses, load_num_pages } from "./historySlice";
import { sortBy } from 'lodash';
import { Pagination } from "@material-ui/lab";
import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { SAKUGABOORU_TAG_URL } from "./GameSummary";
import Matches from "./GuessMatcher";
import Navigation from "./Navigation";

const PAGE_SIZE = 12;

const useStyles = makeStyles({
    pagination: {
        margin: "1em 0",
    },
    container: {
        paddingBottom: 56,
    }
})

const History = () => {
    const dispatch = useThunkDispatch();
    const { guesses, num_guesses, page } = useSelector((state: RootState) => state.history);
    const classes = useStyles();

    useEffect(() => dispatch(load_num_pages()), [dispatch]);
    useEffect(() => dispatch(load_guesses({ page: 0, page_size: PAGE_SIZE })), [dispatch]);

    const on_page_change = (_: React.ChangeEvent<unknown>, page: number) => {
        dispatch(load_guesses({ page: page - 1, page_size: PAGE_SIZE }));
    }

    const game_history = (
        <React.Fragment>
            <Grid container spacing={2}>
                {guesses.map(guess_ui)}
            </Grid>
            <Pagination
                className={classes.pagination}
                page={page + 1}
                count={Math.ceil(num_guesses / PAGE_SIZE)}
                onChange={on_page_change}
            />
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <Container className={classes.container}>
                {guesses.length === 0 ? <h1>No game history</h1> : game_history}
            </Container>
            <Navigation />
        </React.Fragment>
    )
};

const render_guess = (guess: string | undefined, answers: Tag[]) => {
    const match_result = Matches({ guess, answers });
    const guess_string = "\"" + guess + "\" ";
    return {
        missing: "No guess",
        correct: guess_string + "🎉 was correct 🎊",
        incorrect: guess_string + "was incorrect",
    }[match_result.result]
}

const guess_ui = (guess: DatabaseGuess) => {
    const last_video = guess.videos[guess.videos.length - 1];
    const tags = sortBy(last_video.tags, ["count"]);
    const title = tags[tags.length - 1].name;

    return (
        <Grid key={guess.id} item className="round-summary" xs={12} sm={6} md={4}>
            <Card>
                <CardActionArea href={SAKUGABOORU_TAG_URL + title.split(" ").join("_")} target="_blank">
                    <CardMedia
                        component="img"
                        title={"Image thumbnail of a clip from " + guess.videos[0].tags[0].name}
                        alt={"Image thumbnail of a clip from " + guess.videos[0].tags[0].name}
                        image={guess.videos[0].preview_url}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {render_guess(guess.guess, tags)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

export default History;