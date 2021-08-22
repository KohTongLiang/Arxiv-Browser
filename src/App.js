import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core'

import ParentComponent from './Components'

function App() {
  // Allow google dark theme
  const theme = React.useMemo(
    () => createMuiTheme({
      palette: {
        type: true ? 'dark' : 'light',
      },
    }),
  );

  return (
    <div>
      <ThemeProvider theme={theme}>
        <ParentComponent />
        <CssBaseline />
      </ThemeProvider>
    </div>
  );
}

export default App;
