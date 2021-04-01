import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import GameSummary, { GameSummaryProps } from './GameSummary';
import { TagType } from './App';
import Navigation from './Navigation';
import { Route } from 'react-router-dom';


export default {
  title: 'GameSummary',
  component: GameSummary,
} as Meta;

const Template: Story<GameSummaryProps> = (args) => (
    <React.Fragment>
        <Route path="/">
            <GameSummary {...args} />
            <Navigation />
        </Route>
    </React.Fragment>
);

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
    rounds: Array(5).fill(INCORRECT_ROUND).concat(Array(12).fill(CORRECT_ROUND)),
    all_tags: Array(17).fill(EIZOUKEN_TAG),
};