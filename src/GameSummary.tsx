import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import { Tag, useThunkDispatch } from "./App";
import { start } from "./appSlice";
import { choose_random_tags } from './StartButton';
import { Round } from "./GameDatabase";
import React from "react";
import RoundSummaries from "./RoundSummaries";

export type GameSummaryProps = {
    rounds: Round[],
    all_tags: Tag[],
};

const useContainerStyles = makeStyles({
    root: {
        paddingBottom:56,
    }
});

const GameSummary = ({rounds, all_tags}: GameSummaryProps) => {
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
            <RoundSummaries rounds={rounds} />
        </Container>
    )
}

export default GameSummary;