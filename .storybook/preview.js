import { ThemeProvider } from '@material-ui/styles';
import '../src/App.css';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import dark_theme from '../src/dark_theme';
import { store } from '../src/app/store';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={dark_theme}>
      <CssBaseline />
      <Provider store={store}>
        <Router>
          <Switch>
            <Story />
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  )
]