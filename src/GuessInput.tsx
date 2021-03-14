import { Button, Icon, IconButton, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Tag } from './App';

type Props = {
  on_guess_changed: (guess: string) => void,
  on_guess_submitted: () => void,
}

const GuessInput = ({ on_guess_changed, on_guess_submitted }: Props) => {
  const [matching_tags, set_matching_tags] = useState<Tag[]>([]);
  const [search, set_search] = useState<string>("");

  useEffect(() => {
    if (search) {
      fetch_tags(search).then(set_matching_tags);
    } else {
      set_matching_tags([]);
    }
  }, [search]);

  const on_guess_change = (event: ChangeEvent<{}>, value: Tag | null) => on_guess_changed(value?.name ?? "");
  
  const on_form_submitted = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    on_guess_submitted();
  }

  return (
    <form id="guess" onSubmit={on_form_submitted}>
      <Autocomplete
        selectOnFocus
        clearOnBlur
        autoHighlight
        autoComplete
        disableClearable
        clearOnEscape
        options={matching_tags}
        style={{ width: 300 }}
        getOptionLabel={(tag: Tag) => tag.name.replaceAll("_", " ")}
        onChange={on_guess_change}
        onInputChange={(_, value) => set_search(value)}
        renderInput={(params) => <TextField {...params} label="Guess the title" variant="filled" />}
      />
      <IconButton type="submit">
        <Icon>send</Icon>
      </IconButton>
    </form>
  );
};

async function fetch_tags(search: string) {
  const response = await fetch('/api/tag.json?limit=25&type=3&order=count&name='+search.toLowerCase().replaceAll(" ", "_"));
  const tags: Tag[] = await response.json() as Tag[];
  return tags.filter(({ count }) => count > 0);
}

export default GuessInput;