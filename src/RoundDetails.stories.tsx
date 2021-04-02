import { Story, Meta } from '@storybook/react';
import { Round } from './GameDatabase';
import RoundDetails, { RoundDetailsProps } from './RoundDetails';

export default {
    title: 'Round Details',
    component: RoundDetails,
} as Meta;

const Template: Story<RoundDetailsProps> = (args) => (
    <RoundDetails {...args} />
)

const ROUND: Round = {
    date: 1617336533943,
    videos: [
        {
            tags: [
                {
                    count: 507,
                    id: 4355,
                    name: 'inazuma eleven'
                },
                {
                    count: 42,
                    id: 14436,
                    name: 'inazuma eleven (movie)'
                },
                {
                    count: 691,
                    id: 8964,
                    name: 'inazuma eleven series'
                }
            ],
            url: 'https://sakugabooru.com/data/31f8975db045f107512113ab3ba31bf3.mp4',
            id: 150042,
            preview_url: 'https://sakugabooru.com/data/preview/31f8975db045f107512113ab3ba31bf3.jpg',
            played: true
        },
        {
            tags: [
                {
                    count: 507,
                    id: 4355,
                    name: 'inazuma eleven'
                },
                {
                    count: 691,
                    id: 8964,
                    name: 'inazuma eleven series'
                }
            ],
            url: 'https://sakugabooru.com/data/6a8dc4f541dc5b8798de787b45ca7ba3.mp4',
            id: 146839,
            preview_url: 'https://sakugabooru.com/data/preview/6a8dc4f541dc5b8798de787b45ca7ba3.jpg',
            played: true
        },
        {
            tags: [
                {
                    count: 507,
                    id: 4355,
                    name: 'inazuma eleven'
                },
                {
                    count: 691,
                    id: 8964,
                    name: 'inazuma eleven series'
                }
            ],
            url: 'https://sakugabooru.com/data/98fcb9704a3f7e494a88206a0254f734.mp4',
            id: 147510,
            preview_url: 'https://sakugabooru.com/data/preview/98fcb9704a3f7e494a88206a0254f734.jpg',
            played: true
        }
    ],
    time_to_guess: 30,
    tag: {
        count: 691,
        id: 8964,
        name: 'inazuma eleven series'
    },
    id: 15
}


export const CorrectRound = Template.bind({});
CorrectRound.args = {
    round: ROUND
};