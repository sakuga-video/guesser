import { Icon, IconButton, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ChangeEvent, FormEvent } from 'react';
import { Tag, useThunkDispatch } from './App';
import { matchSorter, MatchSorterOptions } from 'match-sorter';
import { change_guess, submit_guess } from './appSlice';

const GuessInput = ({ all_tags }: { all_tags: Tag[] }) => {
  const dispatch = useThunkDispatch();

  const on_guess_change = (_: ChangeEvent<{}>, value: Tag | null) => {
    dispatch(change_guess(value?.name ?? ""));
  }

  const on_form_submitted = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(submit_guess());
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
        renderInput={(params) => <TextField {...params} label="Guess the title" variant="filled" autoFocus />}
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