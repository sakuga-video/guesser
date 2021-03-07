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
  
  return (
    <form id="guess" className="controls" onSubmit={submit_guess}>
      <input type="text" placeholder="Guess the title" onChange={(event: ChangeEvent<HTMLInputElement>) => set_guess(event.target.value)} />
    </form>
  );
};

export default Guess;