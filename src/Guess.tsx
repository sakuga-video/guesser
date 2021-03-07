import { Button, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Tag } from './App';

type Props = {
  all_tags: Tag[],
  on_guess_submitted: (guess: string) => void,
}

const Guess = ({all_tags, on_guess_submitted }: Props) => {
  const on_guess_change = (event: ChangeEvent<{}>, value: Tag | null) => on_guess_submitted(value?.name ?? "");
  
  return (
    <div id="guess" className="controls">
      <Autocomplete
        blurOnSelect
        disableClearable
        options={all_tags}
        style={{ width: 300 }}
        getOptionLabel={(tag: Tag) => tag.name.replaceAll("_", " ")}
        onChange={on_guess_change}
        renderInput={(params) => <TextField {...params} label="Guess the title" />}
      />
    </div>
  );
};

export default Guess;