import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { POPULARITY_LIST, Tag } from './App';
import { Guess } from './GuessMatcher';
import { Video } from './VideoWrapper';

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
    change_video: (state, action: PayloadAction<Video>) => {
      const new_video = action.payload;
      const index = state.index;
      const guess = state.guesses[index]?.guess;
      state.guesses[index] = { guess, answers: new_video.tags };
      state.videos[index] ?
        state.videos[index].push(new_video) :
        state.videos[index] = [new_video];
    },
    submit_guess: state => {
      const guesses = state.guesses;
      const index = state.index;
      const videos = state.videos[index];

      // someone tried to submit a guess before
      // the video loaded. just ignore it
      if (videos === undefined) {
        return;
      }
    
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
      const index = state.index;
      const videos = state.videos[index];
      if (videos) {
        state.guesses[index] = {
          guess,
          answers: videos[videos.length - 1]?.tags ?? []
        };
      }
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
