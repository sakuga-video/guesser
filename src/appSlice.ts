import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tag } from './App';
import { Guess } from './GuessMatcher';
import { Video } from './VideoWrapper';
import { AppThunk } from './app/store';
import database from './GuessDatabase';

interface AppState {
  readonly videos: Video[][],
  readonly guesses: Guess[],
  readonly index: number,
  readonly guess_to_show: number | undefined,
  readonly playing: boolean,
  readonly tags: Tag[],
}

const initialState: AppState = {
  videos: [],
  guesses: [],
  index: 0,
  guess_to_show: undefined,
  playing: false,
  tags: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    mark_played: (state, action: PayloadAction<number>) => {
      const video_index = action.payload;
      const tag_index = state.index;
      const guess = state.guesses[tag_index]?.guess;
      const videos = state.videos[tag_index];
      const playing_video = videos[video_index];

      state.guesses[tag_index] = { guess, answers: playing_video.tags };
      playing_video.played = true;
    },
    set_videos: (state, action: PayloadAction<Video[]>) => {
      state.videos[state.index] = action.payload;
    },
    submit_guess: (state, action: PayloadAction<Guess>) => {
      const index = state.index;

      // show current guess
      state.guess_to_show = index;
      state.guesses[index] = action.payload;

      // advance to next tag in the background,
      // so we can preload the next video
      if ((index + 1) < state.tags.length) {
        state.index = index + 1;
      } else {
        state.playing = false;
      }
    },
    stop_showing_guess_results: state => {
      state.guess_to_show = undefined;
    },
    start: (state, action: PayloadAction<Tag[]>) => {
      state.index = 0;
      state.guess_to_show = undefined;
      state.guesses = [];
      state.videos = [];
      state.playing = true;
      state.tags = action.payload;
    },
    change_guess: (state, action: PayloadAction<string>) => {
      const guess = action.payload;
      const index = state.index;
      const videos = state.videos[index];
      if (videos) {
        state.guesses[index] = {
          guess,
          answers: videos[videos.length - 1]?.tags ?? []
        };
      }
    },
    skip_tag: state => {
      state.tags.splice(state.index, 1);
      if ((state.index) >= state.tags.length) {
        state.index = 0;
        state.playing = false;
      }
    },
  },
});

export const {
  mark_played,
  stop_showing_guess_results,
  start,
  submit_guess,
  change_guess,
  skip_tag,
  set_videos,
} = appSlice.actions;

export const save_and_submit_guess = (time_to_guess: number): AppThunk => (dispatch, getState) => {
  const state = getState().app;
  const guesses = state.guesses;
  const index = state.index;
  const videos = state.videos[index];

  // someone tried to submit a guess before
  // the video loaded. just ignore it
  if (videos === undefined || !videos[0]?.played) {
    return;
  }

  // video timed out. submit an empty guess
  let guess = guesses[index];
  if (!guess) {
    guess = {
      answers: videos[videos.length - 1]?.tags ?? [],
    };
  }

  database.guesses.put({
    date: Date.now(),
    guess: guess.guess,
    videos: videos.filter(video => video.played),
    time_to_guess,
  })
  .then(() => dispatch(submit_guess(guess)))
  .catch(console.log);
};

export default appSlice.reducer;
