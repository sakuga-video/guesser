import { TextField } from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useState } from 'react';

type Props = {
  on_guess_submitted: (guess: string) => void,
}

const Guess = ({ on_guess_submitted }: Props) => {
  const [guess, set_guess] = useState<string>("");

  const submit_guess = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    on_guess_submitted(guess);
  }

  const on_guess_change = (event: ChangeEvent<HTMLInputElement>) => set_guess(event.target.value);
  
  return (
    <form id="guess" className="controls" onSubmit={submit_guess}>
      <TextField label="Guess the title" onChange={on_guess_change} />
    </form>
  );
};

export default Guess;