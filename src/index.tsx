import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/styles';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import History from './History';
import dark_theme from './dark_theme';
import TagDetailsLoader from './TagDetailsLoader';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={dark_theme}>
      <CssBaseline />
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/tag/:id">
              <TagDetailsLoader />
            </Route>
            <Route path="/history">
              <History />
            </Route>
            <Route path="/">
              <App />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
