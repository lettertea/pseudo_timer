import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import App from "./App";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {grey, teal, yellow} from "@material-ui/core/colors";

const store = createStore(rootReducer, applyMiddleware(thunk));


const theme = createMuiTheme({
  palette: {
    primary: teal,

    text: {
      primary: grey["900"],
      secondary: grey["700"]
    }
  },
});

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
