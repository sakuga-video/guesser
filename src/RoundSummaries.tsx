import { Grid } from "@material-ui/core";
import { Round } from "./GameDatabase";
import RoundSummary from "./RoundSummary";

const RoundSummaries = ({rounds}: {rounds: Round[]}) => (
    <Grid container spacing={2}>
        {rounds.map((round, index) => (
            <Grid key={round.id ?? index} item className="round-summary" xs={12} sm={6} md={4}>
                <RoundSummary round={round} />
            </Grid>
        ))}
    </Grid>
);

export default RoundSummaries;