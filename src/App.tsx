import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import GuessInput from './GuessInput';
import VideoPlayer from './VideoPlayer';
import GuessResultUI from './GuessResultUI';
import guess_matches from './GuessMatcher';
import { fetch_all_tags } from './SakugaAPI';
import VideoWrapper from './VideoWrapper';
import { RootState, store } from './app/store';
import GameSummary from './GameSummary';
import Progress from './Progress';
import StartButton from './StartButton';
import Navigation from './Navigation';

export enum TagType {
  GENERAL = 0,
  ARTIST = 1,
  COPYRIGHT = 3,
  CHARACTER = 4,
}

export type Tag = {
  readonly count: number,
  readonly id: number,
  readonly name: string,
};

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

  const match_result = useSelector((state: RootState) => {
    const guess_to_show = state.app.guess_to_show;
    return guess_to_show === undefined ?
      undefined :
      guess_matches(state.app.guesses[guess_to_show]!);
  });

  const [all_tags, set_all_tags] = useState<Tag[]>([]);
  const [video_wrapper, set_video_wrapper] = useState<VideoWrapper | undefined>(undefined);

  useEffect(() => {
    fetch_all_tags().then(tags => {
      set_all_tags(tags);
      set_video_wrapper(new VideoWrapper(tags));
    });
  }, []);

  if (!playing && guesses.length > 0 && guess_to_show === undefined) {
    return (
      <React.Fragment>
        <GameSummary all_tags={all_tags} />
        <Navigation />
      </React.Fragment>
    );
  }

  return (
    <div id="game">
      {
        !playing &&
        guesses.length === 0 &&
        <React.Fragment>
          <StartButton all_tags={all_tags} />
          <Navigation />
        </React.Fragment>
      }
      {
        playing && tags.length > 0 && video_wrapper &&
        <React.Fragment>
          <VideoPlayer
            round={index}
            tag={tags[index]}
            videos={videos[index] ?? []}
            video_wrapper={video_wrapper}
            should_play={guess_to_show === undefined}
          />

          {guess_to_show === undefined && videos[index] && <GuessInput all_tags={all_tags} />}
        </React.Fragment>
      }
      {
        (playing || index > 0) && tags.length > 0 &&
        <Progress activeStep={index} steps={tags.map(tag => tag.name)} guesses={guesses} />
      }
      {
        guess_to_show !== undefined &&
        match_result !== undefined &&
        <GuessResultUI
          {...match_result}
          {...guesses[guess_to_show]}
        />
      }
    </div>
  );
}

export default App;
