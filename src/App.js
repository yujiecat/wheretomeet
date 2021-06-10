import React from "react";
import { useRoutes } from "react-router-dom";
import routes from 'src/routes.js';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';

const App = () => {
    const routing = useRoutes(routes(localStorage.getItem('recentlySelectedGroup')));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>

  );
}

export default App;