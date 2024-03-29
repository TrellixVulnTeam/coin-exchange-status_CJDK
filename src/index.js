// @format
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import registerServiceWorker from './registerServiceWorker';
import Reboot from 'material-ui/Reboot';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6ec6ff',
      main: '#2196f3',
      dark: '#0069c0',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ff5983',
      main: '#f50057',
      dark: '#bb002f',
      contrastText: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
      divider: 'rgba(0, 0, 0, 0.12)',
      light: {
        primary: 'rgba(255, 255, 255, 0.87)',
        secondary: 'rgba(255, 255, 255, 0.54)',
        disabled: 'rgba(255, 255, 255, 0.38)',
        hint: 'rgba(255, 255, 255, 0.38)',
        divider: 'rgba(255, 255, 255, 0.12)',
      },
      white: 'rgb(255, 255, 255)',
    },
  },
  widths: {
    drawer: '240px',
  },
  heights: {
    topBar: '64px',
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <Reboot>
        <App />
      </Reboot>
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
