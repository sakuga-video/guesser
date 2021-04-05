import { Box, Card, CardActions, CardContent, CardMedia, Chip, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Link, SaveAlt } from "@material-ui/icons";
import { sortBy } from "lodash";
import React from "react";
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
    padded_grid: {
        marginBottom: theme.spacing(1),
    }
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
                                    <Chip label={tag.name} key={tag.id} component="a" href={tag_url(tag)} clickable />
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
        <React.Fragment>
            <Typography variant="h5" component="h2" gutterBottom>{new Date(round.date).toDateString()}</Typography>
            <Typography gutterBottom>{get_guess(round.guess)}</Typography>
            <Grid container spacing={2} className={classes.padded_grid}>
                {round.videos.map(video_ui)}
            </Grid>
        </React.Fragment>
    )
};

const get_guess = (guess?: string) => guess ? "Your guess: " + guess : "No guess";

export default RoundDetails;