import { Card, CardActionArea, CardMedia, CardContent, Typography, makeStyles } from "@material-ui/core";
import { sortBy } from 'lodash';
import { Round } from "./GameDatabase";
import { Tag } from "./App";
import Matches from "./GuessMatcher";
import React from "react";
import { Link } from "react-router-dom";

const TAG_URL = "https://www.sakugabooru.com/post?tags=";
export const tag_url = (tag: Tag) => TAG_URL + tag.name.split(" ").join("_");

const useStyles = makeStyles(theme => ({
    title: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },
    media: {
        height: 240,
    },
    root: {
        textDecoration: "none",
        color: theme.palette.text.primary,
    }
}));

export type RoundSummaryProps = {
    round: Round,
};

const RoundSummary = ({ round }: RoundSummaryProps) => {
    const classes = useStyles();
    
    const last_video = round.videos[round.videos.length - 1];
    const tags = sortBy(last_video.tags, ["count"]);
    const title_tag = tags[tags.length - 1];

    return (
        <Card>
            <CardActionArea component="div">
                <Link to={"/history/"+round.id} className={classes.root}>
                    <CardMedia
                        component="img"
                        title={"Image thumbnail of a clip from " + round.videos[0].tags[0].name}
                        alt={"Image thumbnail of a clip from " + round.videos[0].tags[0].name}
                        image={round.videos[0].preview_url}
                        className={classes.media}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2" className={classes.title}>
                            {title_tag.name}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {render_guess(round.guess, tags)}
                        </Typography>
                    </CardContent>
                </Link>
            </CardActionArea>
        </Card>
    );
};

const render_guess = (guess: string | undefined, answers: Tag[]) => {
    const match_result = Matches({ guess, answers });
    const guess_string = "\"" + guess + "\" ";
    return {
        missing: "No guess",
        correct: guess_string + "🎉 was correct 🎊",
        incorrect: guess_string + "was incorrect",
    }[match_result.result]
};

export default RoundSummary;