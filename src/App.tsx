import React, { useCallback, useEffect, useState } from 'react';
import sample from 'lodash/sample';
import './App.css';
import GuessInput from './GuessInput';
import VideoPlayer from './VideoPlayer';
import Button from '@material-ui/core/Button';
import { Map, List } from 'immutable';
import GuessResultUI from './GuessResultUI';
import Score from './Score';
import { CircularProgress } from '@material-ui/core';
import guess_matches, { Guess } from './GuessMatcher';
import { fetch_all_tags } from './SakugaAPI';
import VideoWrapper, { Video } from './VideoWrapper';
import { useTimer } from 'use-timer';

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

function App() {
  const [loading_progress, set_loading_progress] = useState(0);
  const [all_tags, set_all_tags] = useState<Tag[]>([]);
  const [videos, set_videos] = useState(List<Video>());
  const [video_wrapper, set_video_wrapper] = useState<VideoWrapper | undefined>(undefined);
  const [selected_tags, set_selected_tags] = useState<Tag[]>([]);
  const [playing, set_playing] = useState(false);
  const [guesses, set_guesses] = useState(Map<number, Guess>());
  const [index, set_index] = useState(0);
  const [guess_to_show, set_guess_to_show] = useState<number | undefined>(undefined);

  const next_tag_timer = useTimer({
    interval: TIMER_INTERVAL,
    endTime: NEXT_TAG_TIMER_LENGTH,
    onTimeOver: () => {
      set_guess_to_show(index);
    },
  });
  const guess_result_timer = useTimer({
    endTime: RESULT_DISPLAY_DURATION,
    interval: TIMER_INTERVAL,
    onTimeOver: () => {
      set_guess_to_show(undefined);
      /* play next video, or show end screen if it was the last video */
    }
  });

  useEffect(() => {
    let progress = 10;
    set_loading_progress(progress);
    const load = setInterval(() => {
      if (progress < 90) {
        progress+=10;
        set_loading_progress(progress);
      } else {
        clearInterval(load);
      }
    }, 100);
    fetch_all_tags().then(tags => {
      set_loading_progress(100);
      set_all_tags(tags);
      set_video_wrapper(new VideoWrapper(tags));
    });
    return () => clearInterval(load);
  }, []);

  const play_next_tag = () => {
    if (!guesses.has(index)) {
      const new_guesses = guesses.set(index, {
        answers: videos.last<Video>()?.tags ?? [],
      });
      set_guesses(new_guesses);
    }
    set_guess_to_show(index);

    if ((index + 1) < selected_tags.length) {
        set_index(index + 1);
    } else {
        reset();
    }
  }
  
  const start = () => {
    set_selected_tags(choose_random_tags(all_tags));
    set_playing(true);
    set_guesses(Map());
    set_index(0);
    next_tag_timer.start();
  }

  const reset = () => {
    set_playing(false);
    set_selected_tags([]);
  }

  const set_guess = (guess: string) => {
    const new_guesses = guesses.set(index, {
      guess,
      answers: videos.last<Video>()?.tags ?? []
    });
    set_guesses(new_guesses);
  }

  const lock_in_guess = () => {
    const guess = guesses.get(index);
    if (guess) {
      play_next_tag();
    }
  }

  const add_video = useCallback(
    (video: Video) => {
      console.log("app: set_videos")
      set_videos(videos => videos.push(video))
    },
    []
  );

  const score = (guesses: Map<number, Guess>) => {
    let total = 0;
    guesses.forEach(guess => {
      if (guess_matches(guess).matches) {
        total += 1;
      }
    })
    return total;
  }

  return (
    <React.Fragment>
      {
        guess_to_show &&
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
        <CircularProgress variant="determinate" value={loading_progress} />
      }
      {
        !playing &&
        <Button
          variant="contained"
          disabled={all_tags.length === 0}
          onClick={start}
          id="start">
            Start
        </Button>
      }
      {
        playing && selected_tags.length > 0 && !guess_to_show && video_wrapper &&
        <React.Fragment>
          <CircularProgress
            color={normalize(next_tag_timer.time) < 25 ? "secondary" : "primary"}
            key={selected_tags[index].id}
            variant="determinate"
            value={normalize(next_tag_timer.time)}
            className="controls timer" />
          <VideoPlayer
            tag={selected_tags[index]}
            video={videos.last()}
            on_video_changed={add_video}
            video_wrapper={video_wrapper}
          />
        </React.Fragment>
      }
      {
        guess_to_show &&
        <GuessResultUI
          guess_result={{
            guess: guesses.get(guess_to_show)!,
            match_result: guess_matches(guesses.get(guess_to_show)!),
          }} />
      }
      {
        playing && !guess_to_show &&
        <GuessInput
          on_guess_changed={set_guess}
          on_guess_submitted={lock_in_guess}
          all_tags={all_tags}
        />
      }
    </React.Fragment>
  );
}

function choose_random_tags(tags: Tag[]): Tag[] {
  return popularity_list.map(({ max, min }) =>
    sample(tags.filter(({ count }) => max >= count && count >= min))
  ) as Tag[];
}

const popularity_list: Popularity[] = [
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

export default App;
