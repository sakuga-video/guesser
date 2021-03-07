import { Button, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Tag } from './App';

type Props = {
  all_tags: Tag[],
  on_guess_submitted: (guess: string) => void,
}

const Guess = ({all_tags, on_guess_submitted }: Props) => {
  const [guess, set_guess] = useState<string>("");

  const submit_guess = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    on_guess_submitted(guess);
  }

  const on_guess_change = (event: ChangeEvent<{}>, value: Tag | null) => set_guess(value?.name ?? "");
  
  return (
    <form id="guess" className="controls" onSubmit={submit_guess}>
      <Autocomplete
        options={all_tags}
        style={{ width: 300 }}
        getOptionLabel={(tag: Tag) => tag.name.replaceAll("_", " ")}
        onChange={on_guess_change}
        renderInput={(params) => <TextField {...params} label="Guess the title" />}
      />
      <Button type="submit" color="primary">Guess</Button>
    </form>
  );
};

export default Guess;