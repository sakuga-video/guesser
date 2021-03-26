import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tag } from './App';
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
    submit_guess: state => {
      const guesses = state.guesses;
      const index = state.index;
      const videos = state.videos[index];

      // someone tried to submit a guess before
      // the video loaded. just ignore it
      if (videos === undefined || !videos[0]?.played) {
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
      if ((index + 1) < state.tags.length) {
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
      if ((state.index + 1) >= state.tags.length) {
        state.index = 0;
        state.playing = false;
      }
    },
  },
});

export const {
  mark_played,
  show_next_tag,
  start,
  submit_guess,
  change_guess,
  skip_tag,
  set_videos,
} = appSlice.actions;

export default appSlice.reducer;
