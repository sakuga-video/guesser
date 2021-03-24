import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import GameSummary, { GameSummaryProps } from './GameSummary';
import { TagType } from './App';


export default {
  title: 'GameSummary',
  component: GameSummary,
} as Meta;

const Template: Story<GameSummaryProps> = (args) => <GameSummary {...args} />;

const EIZOUKEN_NAME = "eizouken ni wa te wo dasu na!";
const EIZOUKEN_TAG = {
    name: EIZOUKEN_NAME,
    ambiguous: false, count: 1, id: 1, type: TagType.COPYRIGHT,
};
const INCORRECT_GUESS = {
    answers: [EIZOUKEN_TAG],
    guess: "incorrect guess",
};
const CORRECT_GUESS = {
    answers: [EIZOUKEN_TAG],
    guess: EIZOUKEN_NAME,
};
const INCORRECT_ROUND = {
    tag: EIZOUKEN_TAG,
    videos: [{
        url:"https://sakugabooru.com/data/f5fd3ce666022275c261156be8fb14e0.mp4",
        id:109628,
        tags:[EIZOUKEN_TAG],
        preview_url:"https://sakugabooru.com/data/preview/f5fd3ce666022275c261156be8fb14e0.jpg",

    }],
    guess: INCORRECT_GUESS,
};
const CORRECT_ROUND = {
    ...INCORRECT_ROUND,
    guess: CORRECT_GUESS,
};

export const Guesses = Template.bind({});
Guesses.args = {
    rounds: Array(5).fill(INCORRECT_ROUND).concat(Array(5).fill(CORRECT_ROUND)),
    all_tags: Array(10).fill(EIZOUKEN_TAG),
};