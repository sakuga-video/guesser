import { ThemeProvider } from '@material-ui/styles';
import '../src/App.css';
import { Provider } from 'react-redux';
import { dark_theme } from '../src/index';
import { store } from '../src/app/store';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={dark_theme}>
      <Provider store={store}>
        <Story />
      </Provider>
    </ThemeProvider>
  )
]