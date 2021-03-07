import React, { useEffect, useState } from 'react';
import sample from 'lodash/sample';
import './App.css';
import Guess from './Guess';
import VideoPlayer from './VideoPlayer';
import Button from '@material-ui/core/Button';
import { Map } from 'immutable';
import GuessResultUI, { GuessResult } from './GuessResultUI';

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
  const [all_tags, set_all_tags] = useState<Tag[]>([]);
  const [selected_tags, set_selected_tags] = useState<Tag[]>([]);
  const [playing, set_playing] = useState<boolean>(false);
  const [guesses, set_guesses] = useState<Map<Video, string>>(Map());
  const [current_video, set_current_video] = useState<Video | undefined>(undefined);
  const [score, set_score] = useState<number>(0);
  const [index, set_index] = useState<number>(0);
  const [guess_result, set_guess_result] = useState<GuessResult | undefined>(undefined);

  useEffect(() => {
    fetch_tags().then(tags =>
      set_all_tags(tags.filter(tag => tag.type === TagType.COPYRIGHT))
    );
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => set_guess_result(undefined), 5_500);
  }, [guess_result])

  const play_next = () => {
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
    set_score(0);
    set_index(0);
  }

  const reset = () => {
    set_playing(false);
    set_selected_tags([]);
  }

  const show_guess_result = (video: Video, guess:string) => {
    set_guess_result({
      guess,
      correct_answer: video.tag.name,
      is_correct: guess_matches(guess, video),
    })
  }
  

  const add_guess = (guess: string) => {
    if (current_video !== undefined) {
      const new_guesses = guesses.set(current_video, guess);
      show_guess_result(current_video, guess);
      set_guesses(new_guesses);
      recalculate_score(new_guesses);
      play_next();
    }
  }

  const recalculate_score = (guesses: Map<Video, string>) => {
    let total = 0;
    guesses.forEach((guess, video) => {
      if (guess_matches(guess, video)) {
        total += 1;
      }
    })
    set_score(total);
  }

  return (
    <React.Fragment>
      <p id="score" className="controls">Score: {score}</p>
      {!playing && <Button variant="contained" disabled={all_tags.length === 0} onClick={start} id="start">Start</Button>}
      {playing && <VideoPlayer
        tags={selected_tags}
        on_end={reset}
        current_video={current_video}
        set_current_video={set_current_video}
        index={index}
        set_index={set_index}
        play_next={play_next} />}
      <GuessResultUI guess_result={guess_result} />
      {playing && <Guess on_guess_submitted={add_guess} all_tags={all_tags} />}
    </React.Fragment>
  );
}

function guess_matches(guess: string, video: Video) {
  return guess === video.tag.name;
}

async function fetch_tags() {
  const response = await fetch('/api/tag.json?limit=0&order=count');
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
