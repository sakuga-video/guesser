import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "./App";
import { RootState } from "./app/store";
import { DatabaseGuess } from "./GuessDatabase";
import { load_guesses, load_num_pages } from "./historySlice";
import { sortBy } from 'lodash';
import { Pagination } from "@material-ui/lab";
import { Container, Grid } from "@material-ui/core";

const PAGE_SIZE = 12;

const History = () => {
    const dispatch = useThunkDispatch();
    const { guesses, num_guesses, page } = useSelector((state: RootState) => state.history);

    useEffect(() => dispatch(load_num_pages()), [dispatch]);
    useEffect(() => dispatch(load_guesses({ page: 0, page_size: PAGE_SIZE })), [dispatch]);

    const on_page_change = (_: React.ChangeEvent<unknown>, page: number) => {
        dispatch(load_guesses({page: page - 1, page_size: PAGE_SIZE}));
    }

    return (
        <Container>
            <Grid container spacing={2}>
                {guesses.map(guess_ui)}
            </Grid>
            <Pagination
                page={page + 1}
                count={Math.ceil(num_guesses / PAGE_SIZE)}
                onChange={on_page_change}
            />
        </Container>

    )
};

const guess_ui = (guess: DatabaseGuess) => {
    const last_video = guess.videos[guess.videos.length - 1];
    const tags = sortBy(last_video.tags, ["count"]);
    const title = tags[tags.length - 1].name;

    return (
        <Grid key={guess.id} item className="round-summary" xs={12} sm={6} md={4}>
            <p>Title: <a href={"https://www.sakugabooru.com/post?tags=" + title.split(" ").join("_")}>{title}</a></p>
            <p>Guess: {guess.guess}</p>
            <p>Date: {new Date(guess.date).toDateString()}</p>
            <a href={last_video.url}><img src={last_video.preview_url} /></a>
        </Grid>
    );
}

export default History;