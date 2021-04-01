import { ThemeProvider } from '@material-ui/styles';
import '../src/App.css';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import dark_theme from '../src/dark_theme';
import { store } from '../src/app/store';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={dark_theme}>
      <CssBaseline />
      <Provider store={store}>
        <Story />
      </Provider>
    </ThemeProvider>
  )
]