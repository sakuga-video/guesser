import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import { Tag, useThunkDispatch } from "./App";
import { start } from "./appSlice";
import { choose_random_tags } from './StartButton';
import History from './History';
import React from "react";

export type GameSummaryProps = {
    all_tags: Tag[],
};

const useContainerStyles = makeStyles({
    root: {
        paddingBottom:56,
    }
});

const GameSummary = ({all_tags}: GameSummaryProps) => {
    const dispatch = useThunkDispatch();
    const container_classes = useContainerStyles();

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
            <History />
        </Container>
    )
}

export default GameSummary;