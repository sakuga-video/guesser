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
import { start } from './appSlice';
import Timer from './Timer';
import GameSummary, { Round } from './GameSummary';

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

const LOADING_DURATION = 0.8;
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

export function choose_random_tags(tags: Tag[]): Tag[] {
  return POPULARITY_LIST.map(({ max, min }) =>
    sample(tags.filter(({ count }) => max >= count && count >= min))
  ) as Tag[];
}

function score_to_show(index: number, guess_to_show: number | undefined) {
  return guess_to_show !== undefined ?
    index + 1 :
    index;
}

function score(guesses: Guess[], index: number) {
  let total = 0;

  for (let i = 0; i < index; i++) {
    if (guess_matches(guesses[i]).matches) {
      total += 1;
    }
  }

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
  const rounds: Round[] = useSelector((state: RootState) => {
    const app = state.app;
    const number_of_rounds = app.tags.length;
    const rounds = [];
    for (let i = 0; i < number_of_rounds; i++) {
      rounds.push({
        tag: app.tags[i],
        videos: app.videos[i],
        guess: app.guesses[i],
      });
    }
    return rounds;
  });
  const dispatch = useThunkDispatch();

  const [all_tags, set_all_tags] = useState<Tag[]>([]);
  const [video_wrapper, set_video_wrapper] = useState<VideoWrapper | undefined>(undefined);

  useEffect(() => {
    fetch_all_tags().then(tags => {
      set_all_tags(tags);
      set_video_wrapper(new VideoWrapper(tags));
    });
  }, []);

  if (!playing && guesses.length > 0) {
    return <GameSummary rounds={rounds} all_tags={all_tags} />;
  }

  return (
    <div id="game">
      {
        playing &&
          <Score
            score={score(guesses, score_to_show(index, guess_to_show))}
            max_score={score_to_show(index, guess_to_show)} />
      }
      {
        all_tags.length === 0 &&
        <Timer duration={LOADING_DURATION} />
      }
      {
        !playing &&
        guesses.length === 0 &&
        all_tags.length > 0 &&
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
          <VideoPlayer
            tag={tags[index]}
            video={videos[index] ? videos[index][videos[index].length - 1] : undefined}
            video_wrapper={video_wrapper}
          />

          {videos[index] && <GuessInput all_tags={all_tags} />}
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
    </div>
  );
}

export default App;
