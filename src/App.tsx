import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import sample from 'lodash/sample';
import './App.css';
import GuessInput from './GuessInput';
import VideoPlayer from './VideoPlayer';
import Button from '@material-ui/core/Button';
import GuessResultUI from './GuessResultUI';
import Score from './Score';
import { CircularProgress } from '@material-ui/core';
import guess_matches, { Guess } from './GuessMatcher';
import { fetch_all_tags } from './SakugaAPI';
import VideoWrapper from './VideoWrapper';
import { useTimer } from 'use-timer';
import { RootState, store } from './app/store';
import { end_next_tag_timer, end_result_timer, start } from './appSlice';

export enum TagType {
  GENERAL = 0,
  ARTIST = 1,
  COPYRIGHT = 3,
  CHARACTER = 4,
}

export type Tag = {
  readonly ambiguous: boolean,
  readonly count: number,
  readonly id: number,
  readonly name: string,
  readonly type: TagType,
};

type Popularity = { "max": number, "min": number };

const TIMER_INTERVAL = 50;

const NEXT_TAG_TIMER_LENGTH = 10 * 1000 / TIMER_INTERVAL;
const normalize = (value: number) => (NEXT_TAG_TIMER_LENGTH - value) * 100 / NEXT_TAG_TIMER_LENGTH;

const RESULT_DISPLAY_DURATION = 4 * 1000 / TIMER_INTERVAL;
const normalize_result_timer = (value: number) => value * 100 / RESULT_DISPLAY_DURATION;

const LOADING_DURATION = 0.8 * 1000 / TIMER_INTERVAL;
const normalize_loading_timer = (value: number) => value * 90 / LOADING_DURATION;

export const POPULARITY_LIST: Popularity[] = [
  { "max": 100000, "min": 500 },
  { "max": 100000, "min": 500 },
  { "max": 100000, "min": 500 },
  { "max": 100000, "min": 500 },
  { "max": 100000, "min": 500 },
  { "max": 500, "min": 100 },
  { "max": 500, "min": 100 },
  { "max": 500, "min": 100 },
  { "max": 500, "min": 100 },
  { "max": 500, "min": 100 },
  { "max": 500, "min": 100 },
  { "max": 500, "min": 100 },
  { "max": 100, "min": 25 },
  { "max": 100, "min": 25 },
  { "max": 100, "min": 25 },
  { "max": 25, "min": 1 },
  { "max": 25, "min": 1 },
  { "max": 1, "min": 1 },
];

function choose_random_tags(tags: Tag[]): Tag[] {
  return POPULARITY_LIST.map(({ max, min }) =>
    sample(tags.filter(({ count }) => max >= count && count >= min))
  ) as Tag[];
}

function score(guesses: Guess[]) {
  let total = 0;
  guesses.forEach(guess => {
    if (guess_matches(guess).matches) {
      total += 1;
    }
  })
  return total;
}

export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();

function App() {
  const {
    guesses,
    index,
    videos,
    guess_to_show,
    playing,
    tags,
  } = useSelector((state: RootState) => state.app);
  const dispatch = useThunkDispatch()

  const [all_tags, set_all_tags] = useState<Tag[]>([]);
  const [video_wrapper, set_video_wrapper] = useState<VideoWrapper | undefined>(undefined);
  const next_tag_timer = useTimer({
    interval: TIMER_INTERVAL,
    endTime: NEXT_TAG_TIMER_LENGTH,
    onTimeOver: () => {
      dispatch(end_next_tag_timer());
    },
  });
  const guess_result_timer = useTimer({
    endTime: RESULT_DISPLAY_DURATION,
    interval: TIMER_INTERVAL,
    onTimeOver: () => {
      dispatch(end_result_timer());
    }
  });
  const loading_progress_timer = useTimer({
    endTime: LOADING_DURATION,
    interval: TIMER_INTERVAL,
  });
  const start_loading_progress_timer = loading_progress_timer.start;
  useEffect(() => {
    fetch_all_tags().then(tags => {
      set_all_tags(tags);
      set_video_wrapper(new VideoWrapper(tags));
    });
    start_loading_progress_timer();
  }, [start_loading_progress_timer]);

  return (
    <React.Fragment>
      {
        guess_to_show !== undefined &&
        <CircularProgress
          variant="determinate"
          value={normalize_result_timer(guess_result_timer.time)}
          className="controls timer" />
      }
      {
        playing && <Score score={score(guesses)} max_score={index} />
      }
      {
        all_tags.length === 0 &&
        <CircularProgress variant="determinate" value={all_tags.length > 0 ? 100 : normalize_loading_timer(loading_progress_timer.time)} />
      }
      {
        !playing &&
        <Button
          variant="contained"
          disabled={all_tags.length === 0}
          onClick={() => dispatch(start(choose_random_tags(all_tags)))}
          id="start">
            Start
        </Button>
      }
      {
        playing && tags.length > 0 && guess_to_show === undefined && video_wrapper &&
        <React.Fragment>
          <CircularProgress
            color={normalize(next_tag_timer.time) < 25 ? "secondary" : "primary"}
            key={tags[index].id}
            variant="determinate"
            value={normalize(next_tag_timer.time)}
            className="controls timer" />
          <VideoPlayer
            tag={tags[index]}
            video={videos[videos.length - 1]}
            video_wrapper={video_wrapper}
          />
        </React.Fragment>
      }
      {
        guess_to_show !== undefined &&
        <GuessResultUI
          guess_result={{
            guess: guesses[guess_to_show]!,
            match_result: guess_matches(guesses[guess_to_show]!),
          }} />
      }
      {
        playing && guess_to_show === undefined &&
        <GuessInput all_tags={all_tags} />
      }
    </React.Fragment>
  );
}

export default App;
