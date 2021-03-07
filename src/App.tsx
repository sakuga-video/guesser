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
  const [playing, set_playing] = useState<boolean>(false);

  useEffect(() => {
    fetch_tags().then(tags =>
      set_tags(tags.filter(tag => tag.type === TagType.COPYRIGHT))
    );
  }, [])

  const start = () => {
    set_random_tags(choose_random_tags(tags));
    set_playing(true);
  }

  return (
    <div id="videocontainer" className="fade-out">
      {!playing && <Button variant="contained" disabled={tags.length === 0} onClick={start}>Start</Button>}
      {playing && <VideoPlayer tags={random_tags} />}
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
  {"max": 500, "min": 100},
  {"max": 500, "min": 100},
  {"max": 500, "min": 100},
  {"max": 500, "min": 100},
  {"max": 500, "min": 100},
  {"max": 500, "min": 100},
  {"max": 100, "min": 25},
  {"max": 100, "min": 25},
  {"max": 100, "min": 25},
  {"max": 100, "min": 25},
  {"max": 25, "min": 10},
  {"max": 25, "min": 10},
  {"max": 25, "min": 10},
  {"max": 25, "min": 10},
  {"max": 1, "min": 1},
];

export type Tag = {
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
