import { Card, CardActionArea, CardMedia, CardContent, Typography, makeStyles } from "@material-ui/core";
import { sortBy } from 'lodash';
import { Round } from "./GameDatabase";
import { Tag } from "./App";
import Matches from "./GuessMatcher";

export const TAG_URL = "https://www.sakugabooru.com/post?tags=";

const useStyles = makeStyles({
    title: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },
    media: {
        height: 240,
    }
});

export type RoundSummaryProps = {
    round: Round,
};

const RoundSummary = ({ round }: RoundSummaryProps) => {
    const card_classes = useStyles();

    const last_video = round.videos[round.videos.length - 1];
    const tags = sortBy(last_video.tags, ["count"]);
    const title = tags[tags.length - 1].name;

    return (
        <Card>
            <CardActionArea href={TAG_URL + title.split(" ").join("_")} target="_blank">
                <CardMedia
                    component="img"
                    title={"Image thumbnail of a clip from " + round.videos[0].tags[0].name}
                    alt={"Image thumbnail of a clip from " + round.videos[0].tags[0].name}
                    image={round.videos[0].preview_url}
                    className={card_classes.media}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2" className={card_classes.title}>
                        {title}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {render_guess(round.guess, tags)}
                    </Typography>
                </CardContent>
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