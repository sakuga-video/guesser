import { Container, IconButton, Typography } from "@material-ui/core";
import { Link } from "@material-ui/icons";
import React from "react";
import { Tag } from "./App";
import { Round } from "./GameDatabase";
import RoundDetails from "./RoundDetails";
import { tag_url } from "./RoundSummary";

const TagDetails = ({tag, rounds}: {tag: Tag, rounds: Round[]}) => {
    return (
        <Container>
            <Typography variant="h3" component="h1">
                {tag.name}
                <IconButton href={tag_url(tag)}>
                    <Link />
                </IconButton>
            </Typography>
            {rounds.map(round => <RoundDetails round={round} key={round.id} />)}
        </Container>
    );
};

export default TagDetails;