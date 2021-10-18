import React from 'react';
import { render } from 'react-dom';

import App from './App';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { rootReducer, rootMiddleware, sagaMiddleware, rootSaga } from './features';
import { HandTracking } from './containers/HandTracking';

import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import jssPluginTemplate from 'jss-plugin-template';

import './carousel.global.css';
import './noto.plex.global.css';
import './dosis.global.css';
import './rounded-mplus-1c.css';

// logger の登録
// import { createLogger } from 'redux-logger';
// const excludeLoggerEnvs = ['test', 'production']
// if (!excludeLoggerEnvs.includes(process.env.NODE_ENV || '')) {
//   const logger = createLogger()
//   rootMiddleware.push(logger)
// }

const jss = create({
  plugins: [
    ...jssPreset().plugins,
    jssPluginTemplate()
  ],
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: rootMiddleware,
});

import { history } from './features/history';
import { ConnectedRouter } from 'connected-react-router';
render(
  <Provider store={store}>
    <StylesProvider jss={jss}>
      <HandTracking />
      <ConnectedRouter history={history}>
          <App />
      </ConnectedRouter>
    </StylesProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);

sagaMiddleware.run(rootSaga);
