import React from "react";
import { useRoutes } from "react-router-dom";
import routes from 'src/routes.js';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import { useAuth } from 'src/helpers/AuthContext.js';

const App = () => {
    const { isLoggedIn } = useAuth();
    const loggedIn = isLoggedIn();
    const routing = useRoutes(routes(loggedIn));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>

  );
}

export default App;