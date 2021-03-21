import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import sample from 'lodash/sample';
import './App.css';
import GuessInput from './GuessInput';
import VideoPlayer from './VideoPlayer';
import Button from '@material-ui/core/Button';
import GuessResultUI from './GuessResultUI';
import Score from './Score';
import guess_matches, { Guess } from './GuessMatcher';
import { fetch_all_tags } from './SakugaAPI';
import VideoWrapper from './VideoWrapper';
import { RootState, store } from './app/store';
import { show_next_tag, start, submit_guess } from './appSlice';
import Timer from './Timer';

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

const TAG_TIMER_DURATION = 30;
const RESULT_DISPLAY_DURATION = 4;
const LOADING_DURATION = 0.8;
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

  useEffect(() => {
    fetch_all_tags().then(tags => {
      set_all_tags(tags);
      set_video_wrapper(new VideoWrapper(tags));
    });
  }, []);

  return (
    <React.Fragment>
      {
        guess_to_show !== undefined &&
        <Timer
          duration={RESULT_DISPLAY_DURATION}
          on_time_over={() => dispatch(show_next_tag())}
          className={"controls timer"}
        />
      }
      {
        playing && <Score score={score(guesses)} max_score={index} />
      }
      {
        all_tags.length === 0 &&
        <Timer duration={LOADING_DURATION} />
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
          <Timer
            duration={TAG_TIMER_DURATION}
            on_time_over={() => dispatch(submit_guess())}
            count_down={true}
            show_emergency_color={true}
            className={"controls timer"}
          />
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
