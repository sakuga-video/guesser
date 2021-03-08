import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ChangeEvent, useEffect, useState } from 'react';
import { Tag } from './App';

type Props = {
  on_guess_submitted: (guess: string) => void,
}

const Guess = ({ on_guess_submitted }: Props) => {
  const [matching_tags, set_matching_tags] = useState<Tag[]>([]);
  const [search, set_search] = useState<string>("");

  useEffect(() => {
    if (search) {
      fetch_tags(search).then(set_matching_tags);
    } else {
      set_matching_tags([]);
    }
  }, [search]);

  const on_guess_change = (event: ChangeEvent<{}>, value: Tag | null) => on_guess_submitted(value?.name ?? "");
  
  return (
    <div id="guess" className="controls">
      <Autocomplete
        blurOnSelect
        disableClearable
        options={matching_tags}
        style={{ width: 300 }}
        getOptionLabel={(tag: Tag) => tag.name.replaceAll("_", " ")}
        onChange={on_guess_change}
        onInputChange={(_, value) => set_search(value)}
        renderInput={(params) => <TextField {...params} label="Guess the title" />}
      />
    </div>
  );
};

async function fetch_tags(search: string) {
  const response = await fetch('/api/tag.json?limit=25&type=3&order=count&name='+search.replaceAll(" ", "_"));
  const tags: Tag[] = await response.json() as Tag[];
  return tags.filter(({ count }) => count > 0);
}

export default Guess;