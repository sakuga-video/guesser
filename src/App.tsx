import React, { useEffect, useState } from 'react';
import { setEmitFlags } from 'typescript';
import './App.css';
import Guess from './Guess';
import Score from './Score';
import VideoPlayer from './VideoPlayer';

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
  type: number,
};



function App() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | undefined>(undefined);
  const [guess, setGuess] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    fetchTags().then(setTags);
  }, [])

  return (
    <div id="videocontainer" className="fade-out">
      <Score score={score} />
      <VideoPlayer />
      <ul>
        {
          tags
            .filter(tag => tag.count > 10000)
            .map(tag => <li>{tag.name}</li>)
        }
      </ul>
      <Guess />
    </div>
  );
}

async function fetchTags() {
  const response = await fetch('/api/tag.json?limit=0&order=count');
  const tags: Tag[] = await response.json() as Tag[];
  return tags.filter(({count}) => count > 0);
}

export default App;
