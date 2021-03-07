import React, { useEffect, useState } from 'react';
import { setEmitFlags } from 'typescript';
import sample from 'lodash/sample';
import './App.css';
import Guess from './Guess';
import Score from './Score';
import VideoPlayer from './VideoPlayer';
import Button from '@material-ui/core/Button';
import { random } from 'lodash';

function App() {
  const [tags, set_tags] = useState<Tag[]>([]);
  const [random_tags, set_random_tags] = useState<Tag[]>([]);
  const [videos, set_videos] = useState<Video[]>([]);
  const [currentVideo, set_current_video] = useState<Video | undefined>(undefined);
  const [guess, set_guess] = useState<string>("");
  const [score, set_score] = useState<number>(0);

  useEffect(() => {
    fetch_tags().then(tags =>
      set_tags(tags.filter(tag => tag.type === TagType.COPYRIGHT))
    );
  }, [])

  const start = () => {
    set_random_tags(choose_random_tags(tags));
  }

  return (
    <div id="videocontainer" className="fade-out">
      <Score score={score} />
      <Button variant="contained" disabled={tags.length === 0} onClick={start}>Start</Button>
      {
        random_tags.length !== 0 &&
        <ul>
          {random_tags.map(tag => <li>{tag.name.replaceAll("_", " ")} {tag.count}</li>)}
        </ul>
      }
      <VideoPlayer />
      <Guess />
    </div>
  );
}

async function fetch_tags() {
  const response = await fetch('/api/tag.json?limit=0&order=count');
  const tags: Tag[] = await response.json() as Tag[];
  return tags.filter(({count}) => count > 0);
}

function choose_random_tags(tags: Tag[]): Tag[] {
  return popularity_list.map(({max, min}) =>
    sample(tags.filter(({count}) => max >= count && count >= min))
  ) as Tag[];
}

const popularity_list: Popularity[] = [
  {"max": 100000, "min": 500},
  {"max": 100000, "min": 500},
  {"max": 100000, "min": 500},
  {"max": 500, "min": 400},
  {"max": 400, "min": 300},
  {"max": 300, "min": 200},
  {"max": 200, "min": 100},
  {"max": 100, "min": 50},
  {"max": 50, "min": 25},
  {"max": 25, "min": 10},
  {"max": 1, "min": 1},
];

type Video = {
  url: string,
  name: string,
  popularity: number,
};

type Tag = {
  ambiguous: boolean,
  count: number,
  id: number,
  name: string,
  type: TagType,
};

type Popularity = {"max": number, "min": number};

enum TagType {
  GENERAL = 0,
  ARTIST = 1,
  COPYRIGHT = 3,
  CHARACTER = 4,
}

export default App;
