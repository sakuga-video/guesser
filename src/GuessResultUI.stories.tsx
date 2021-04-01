import { Story, Meta } from '@storybook/react';
import GuessResultUI, { GuessResultUIProps } from './GuessResultUI';

export default {
  title: 'Guess Result',
  component: GuessResultUI,
} as Meta;

const Template: Story<GuessResultUIProps> = (args) => (
    <div id="game">
        <GuessResultUI {...args} />
    </div>
)

const TAG_NAME = "this is a really long tag name that wraps around the box";
const ANSWER = {
    count: 1,
    id: 1,
    name: TAG_NAME,
}

export const ExactlyCorrect = Template.bind({});
ExactlyCorrect.args = {
    guess: TAG_NAME,
    answers: [ANSWER],
    result: "correct",
    is_exact: true,
};