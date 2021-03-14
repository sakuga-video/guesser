import { Icon, IconButton, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ChangeEvent, FormEvent } from 'react';
import { Tag } from './App';
import { matchSorter, MatchSorterOptions } from 'match-sorter';

type Props = {
  on_guess_changed: (guess: string) => void,
  on_guess_submitted: () => void,
  all_tags: Tag[],
}

const GuessInput = ({
    on_guess_changed,
    on_guess_submitted,
    all_tags
  }: Props) => {
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
        options={all_tags}
        style={{ width: 300 }}
        filterOptions={filter_options}
        getOptionLabel={tag => tag.name}
        onChange={on_guess_change}
        renderInput={(params) => <TextField {...params} label="Guess the title" variant="filled" />}
      />
      <IconButton type="submit">
        <Icon>send</Icon>
      </IconButton>
    </form>
  );
};

const match_sorter_options: MatchSorterOptions<Tag> = {
  keys: [tag => tag.name],
  baseSort: (tag_a, tag_b) => tag_b.item.count - tag_a.item.count,
};

const filter_options = (options: Tag[], { inputValue }: { inputValue: string}) =>
  inputValue ? matchSorter(options, inputValue, match_sorter_options).slice(0, 100) : [];
  
export default GuessInput;