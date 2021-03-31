import Dexie from 'dexie';
import { Video } from './VideoWrapper';

class GuessDatabase extends Dexie {
    guesses: Dexie.Table<DatabaseGuess, number>;

    constructor(database_name: string) {
        super(database_name);
        this.version(1).stores({
            guesses: '++id,date,guess,videos,time_to_guess'
        });
        this.guesses = this.table('guesses');
    }
}

export interface DatabaseGuess {
    id?: number,
    date: number,
    guess?: string,
    videos: Video[],
    time_to_guess: number,
}

const database = new GuessDatabase("aniguesser");

export default database;