import { useRoutes } from "react-router-dom";
import routes from 'src/helpers/routes.js';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/helpers/GlobalStyles';
import theme from 'src/theme';

const App = () => {
  const routing = useRoutes(routes());

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>

  );
}

export default App;