import { Fab, makeStyles, TextField } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Tag, useThunkDispatch } from './App';
import { matchSorter, MatchSorterOptions } from 'match-sorter';
import { change_guess, save_and_submit_guess } from './appSlice';
import Timer from './Timer';

const TAG_TIMER_DURATION = 30;
const useStyles = makeStyles({
    wrapper: {
      position: 'relative',
    },
    fabProgress: {
      position: 'absolute',
      top: -6,
      left: -6,
    },
});

const GuessInput = ({ all_tags }: { all_tags: Tag[] }) => {
  const dispatch = useThunkDispatch();
  const classes = useStyles();
  const [guess, set_guess] = useState<Tag | null>(null);

  const on_guess_change = (_: ChangeEvent<{}>, value: Tag | null) => {
    set_guess(value);
    dispatch(change_guess(value?.name ?? ""));
  }

  const on_form_submitted = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (guess) {
      dispatch(save_and_submit_guess(0));
    }
  }

  return (
    <form id="guess" onSubmit={on_form_submitted}>
      <div id="guess-input">
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
      </div>
      <div className={classes.wrapper}>
        <Timer
          size={68}
          duration={TAG_TIMER_DURATION}
          on_time_over={() => dispatch(save_and_submit_guess(TAG_TIMER_DURATION))}
          count_down={true}
          show_emergency_color={true}
          className={classes.fabProgress}
        />
        <Fab type="submit" area-label="submit">
          <Send />
        </Fab>
      </div>
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