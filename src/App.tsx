import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import GuessInput from './GuessInput';
import VideoPlayer from './VideoPlayer';
import GuessResultUI from './GuessResultUI';
import Score from './Score';
import guess_matches, { Guess } from './GuessMatcher';
import { fetch_all_tags } from './SakugaAPI';
import VideoWrapper from './VideoWrapper';
import { RootState, store } from './app/store';
import GameSummary, { Round } from './GameSummary';
import Progress from './Progress';
import StartButton from './StartButton';

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

function score_to_show(index: number, guess_to_show: number | undefined) {
  return guess_to_show !== undefined ?
    index + 1 :
    index;
}

function score(guesses: Guess[], index: number) {
  let total = 0;

  for (let i = 0; i < index; i++) {
    if (guess_matches(guesses[i]).result === "correct") {
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
        videos: app.videos[i]?.filter(video => video.played),
        guess: app.guesses[i],
      });
    }
    return rounds;
  });
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

  if (!playing && guesses.length > 0) {
    return <GameSummary rounds={rounds} all_tags={all_tags} />;
  }

  return (
    <div id="game">
      {
        playing && (tags.length > 0) && index !== undefined &&
        <Progress activeStep={index} steps={tags.map(tag => tag.name)} />
      }
      {
        !playing &&
        guesses.length === 0 &&
        <StartButton all_tags={all_tags} />
      }
      {
        playing && tags.length > 0 && guess_to_show === undefined && video_wrapper &&
        <React.Fragment>
          <VideoPlayer
            tag={tags[index]}
            videos={videos[index] ?? []}
            video_wrapper={video_wrapper}
          />

          {videos[index] && <GuessInput all_tags={all_tags} />}
        </React.Fragment>
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
