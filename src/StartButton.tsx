import { Button, CircularProgress } from "@material-ui/core";
import React from "react";
import sample from 'lodash/sample';
import { useThunkDispatch, Tag } from "./App";
import { start } from './appSlice';

const StartButton = ({ all_tags }: { all_tags: Tag[] }) => {

    const dispatch = useThunkDispatch();
    const is_ready = all_tags.length > 0;

    return is_ready ?
        <Button
            variant="contained"
            onClick={() => dispatch(start(choose_random_tags(all_tags)))}
            id="start">
            Start
        </Button> :
        <CircularProgress />
}

export function choose_random_tags(tags: Tag[]): Tag[] {
    return POPULARITY_LIST.map(({ max, min }) =>
        sample(tags.filter(({ count }) => max >= count && count >= min))
    ) as Tag[];
}

type Popularity = { "max": number, "min": number };

export const POPULARITY_LIST: Popularity[] = [
  { "max": 100000, "min": 500 },
  { "max": 100000, "min": 500 },
  { "max": 100000, "min": 500 },
  { "max": 500, "min": 100 },
  { "max": 500, "min": 100 },
  { "max": 500, "min": 100 },
  { "max": 500, "min": 100 },
  { "max": 500, "min": 100 },
  { "max": 100, "min": 25 },
  { "max": 25, "min": 1 },
  { "max": 25, "min": 1 },
  { "max": 1, "min": 1 },
];

export default StartButton;