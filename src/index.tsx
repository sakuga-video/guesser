import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { lightBlue, red } from '@material-ui/core/colors';
import { store } from './app/store';
import { Provider } from 'react-redux';

const dark_theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: lightBlue,
    secondary: red
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={dark_theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
