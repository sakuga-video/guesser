import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { POPULARITY_LIST, Tag } from './App';
import { Guess } from './GuessMatcher';
import { Video } from './VideoWrapper';

interface AppState {
  readonly videos: Video[],
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
    change_video: (state, action: PayloadAction<Video>) => {
      const new_video = action.payload;
      const guess = state.guesses[state.index]?.guess;
      state.guesses[state.index] = { guess, answers: new_video.tags };
      state.videos.push(new_video);
    },
    submit_guess: state => {
      let guesses = state.guesses;
      let index = state.index;
      const videos = state.videos;
    
      state.guess_to_show = index;
    
      if (!guesses[index]) {
        guesses[index] = {
          answers: videos[videos.length - 1]?.tags ?? [],
        };
      }
    },
    show_next_tag: state => {
      const index = state.index;
      if ((index + 1) < POPULARITY_LIST.length) {
        state.index = index + 1;
      } else {
        state.index = 0;
        state.playing = false;
      }
      state.guess_to_show = undefined;
    },
    start: (state, action: PayloadAction<Tag[]>) => {
      state.index = 0;
      state.guesses = [];
      state.playing = true;
      state.tags = action.payload;
    },
    change_guess: (state, action: PayloadAction<string>) => {
      const guess = action.payload;
      const videos = state.videos;
      const index = state.index;
      state.guesses[index] = {
          guess,
          answers: videos[videos.length - 1]?.tags ?? []
      };
    },
  },
});

export const {
  change_video,
  show_next_tag,
  start,
  submit_guess,
  change_guess
} = appSlice.actions;

export default appSlice.reducer;
