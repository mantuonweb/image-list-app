import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';

import './style.css';
import { store } from './store';
import PageActions from './components/page-actions/actions.component';
import ImageList from './components/image-list/image-list.component';
import SearchAppBar from './components/app-bar/navigation-bar.component';
const theme = createTheme({
  palette: {
    primary: blue,
    secondary: purple,
  },
  typography: {
    useNextVariants: true,
  },
});
export default function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <div>
          <SearchAppBar></SearchAppBar>
          <div className="action-container">
            <PageActions></PageActions>
          </div>
          <div className="page-container">
            <ImageList></ImageList>
          </div>
        </div>
      </MuiThemeProvider>
    </Provider>
  );
}
