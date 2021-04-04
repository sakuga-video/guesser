import { Box, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Container, Grid, GridList, GridListTile, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Link, SaveAlt } from "@material-ui/icons";
import { round, sortBy } from "lodash";
import React from "react";
import { Tag } from "./App";
import { Round } from "./GameDatabase";
import { tag_url } from "./RoundSummary";
import { Video } from "./VideoWrapper";

const VIDEO_URL = "https://www.sakugabooru.com/post/show/";

export type RoundDetailsProps = {
    readonly round: Round,
}

const useStyles = makeStyles(theme => ({
    tag_wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

const RoundDetails = ({ round }: RoundDetailsProps) => {

    const classes = useStyles();

    const video_ui = (video: Video) => {
        const tags = sortBy(video.tags, tag => tag.count);
        const rarest_tag = tags[0];
        const tags_minus_main = tags.filter(tag => tag.id !== round.tag.id);
        return (
            <Grid item key={video.id} xs={12} sm={6} md={4}>
                <Card>
                    <CardMedia
                        component="video"
                        title={"Video clip from " + rarest_tag.name}
                        src={video.url}
                        controls
                        loop
                        poster={video.preview_url}
                    />
                    {
                        tags_minus_main.length > 0 &&
                        <CardContent>
                            <Box className={classes.tag_wrapper}>
                                {tags_minus_main.map(tag =>
                                    <Chip label={tag.name} component="a" href={tag_url(tag)} clickable />
                                )}
                            </Box>
                        </CardContent>
                    }
                    <CardActions>
                        <IconButton href={VIDEO_URL + video.id}>
                            <Link />
                        </IconButton>
                        <IconButton href={video.url} download={rarest_tag.name}>
                            <SaveAlt />
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
        );
    }

    return (
        <Container>
            <Typography variant="h3" component="h1">
                {round.tag.name}
                <IconButton href={tag_url(round.tag)}>
                    <Link />
                </IconButton>
            </Typography>

            <Typography gutterBottom>Popularity: {round.tag.count}</Typography>
            <Typography gutterBottom>{get_guess(round.guess)}</Typography>
            <Typography gutterBottom>{new Date(round.date).toDateString()}</Typography>
            <Grid container spacing={2}>
                {round.videos.map(video_ui)}
            </Grid>
        </Container>
    )
};

const get_guess = (guess?: string) => guess ? "Your guess: " + guess : "No guess";

export default RoundDetails;