import React, { useEffect, useState } from 'react';
import sample from 'lodash/sample';
import './App.css';
import GuessInput from './GuessInput';
import VideoPlayer from './VideoPlayer';
import Button from '@material-ui/core/Button';
import { Map } from 'immutable';
import GuessResultUI, { GuessResult } from './GuessResultUI';
import Score from './Score';
import { CircularProgress } from '@material-ui/core';
import Matcher from './GuessMatcher';

enum TagType {
  GENERAL = 0,
  ARTIST = 1,
  COPYRIGHT = 3,
  CHARACTER = 4,
}

export type Tag = {
  ambiguous: boolean,
  count: number,
  id: number,
  name: string,
  type: TagType,
};

export type Video = {
  url: string,
  id: number,
  tag: Tag,
};

type Popularity = { "max": number, "min": number };

function App() {
  const [loading_progress, set_loading_progress] = useState<number>(0);
  const [all_tags, set_all_tags] = useState<Tag[]>([]);
  const [selected_tags, set_selected_tags] = useState<Tag[]>([]);
  const [playing, set_playing] = useState<boolean>(false);
  const [has_played, set_has_played] = useState<boolean>(false);
  const [guesses, set_guesses] = useState<Map<Tag, string>>(Map());
  const [current_video, set_current_video] = useState<Video | undefined>(undefined);
  const [score, set_score] = useState<number>(0);
  const [index, set_index] = useState<number>(0);
  const [guess_to_show, set_guess_to_show] = useState<Tag | undefined>(undefined);
  const [timer, set_timer] = useState<number>(0);

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
    fetch_tags().then(tags => {
      set_loading_progress(100);
      set_all_tags(tags)
    });
    return () => clearInterval(load);
  }, []);

  useEffect(() => {
    if (guess_to_show) {
      recalculate_score(guesses);
      const interval_duration = 50;
      let timer = 0;
      const interval = setInterval(() => {
        if (timer >= RESULT_DISPLAY_DURATION) {
          set_guess_to_show(undefined);
          timer = 0;
        } else {
          timer += interval_duration;
        }
        set_timer(timer);
      }, interval_duration);
      return () => clearInterval(interval);
    }
  }, [guesses, guess_to_show])

  const play_next = () => {
    const tag = selected_tags[index];
    set_guess_to_show(tag);

    if ((index + 1) < selected_tags.length) {
        set_index(index + 1);
    } else {
        reset();
    }
  }
  
  const start = () => {
    set_selected_tags(choose_random_tags(all_tags));
    set_playing(true);
    set_has_played(true);
    set_guesses(Map());
    set_score(0);
    set_index(0);
  }

  const reset = () => {
    set_playing(false);
    set_selected_tags([]);
  }

  const set_guess = (guess: string) => {
    const tag = selected_tags[index];
    if (tag) {
      const new_guesses = guesses.set(tag, guess);
      set_guesses(new_guesses);
    }
  }

  const recalculate_score = (guesses: Map<Tag, string>) => {
    let total = 0;
    guesses.forEach((guess, tag) => {
      if (guess_matches(guess, tag)) {
        total += 1;
      }
    })
    set_score(total);
  }

  return (
    <React.Fragment>
      {guess_to_show && <CircularProgress key={index} variant="determinate" value={normalize(timer)} className="controls timer" />}
      {has_played && <Score score={score} max_score={index} />}
      {all_tags.length === 0 && <CircularProgress variant="determinate" value={loading_progress} />}
      {!playing && <Button variant="contained" disabled={all_tags.length === 0} onClick={start} id="start">Start</Button>}
      {playing && selected_tags.length > 0 && !guess_to_show && <VideoPlayer
        tag={selected_tags[index]}
        current_video={current_video}
        set_current_video={set_current_video}
        play_next_tag={play_next} />}
      {
        guess_to_show &&
        <GuessResultUI
          guess_result={{
            guess: guesses.get(guess_to_show),
            correct_answer: guess_to_show.name,
            is_correct: guess_matches(guesses.get(guess_to_show), guess_to_show),
          }} />
      }
      {playing && !guess_to_show && <GuessInput on_guess_submitted={set_guess} />}
    </React.Fragment>
  );
}

const RESULT_DISPLAY_DURATION = 3_500;

const normalize = (value: number) => value * 100 / RESULT_DISPLAY_DURATION;

function guess_matches(guess: string | undefined, tag: Tag) {
  return guess !== undefined && Matcher({guess, answer: tag.name});
}

async function fetch_tags() {
  const response = await fetch('/api/tag.json?limit=0&order=count&type='+TagType.COPYRIGHT);
  const tags: Tag[] = await response.json() as Tag[];
  return tags.filter(({ count }) => count > 0);
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
  { "max": 500, "min": 100 },
  { "max": 500, "min": 100 },
  { "max": 500, "min": 100 },
  { "max": 500, "min": 100 },
  { "max": 500, "min": 100 },
  { "max": 500, "min": 100 },
  { "max": 100, "min": 25 },
  { "max": 100, "min": 25 },
  { "max": 100, "min": 25 },
  { "max": 100, "min": 25 },
  { "max": 25, "min": 10 },
  { "max": 25, "min": 10 },
  { "max": 25, "min": 10 },
  { "max": 25, "min": 10 },
  { "max": 1, "min": 1 },
];

export default App;
