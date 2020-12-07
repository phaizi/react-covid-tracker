import './App.css';
import InfoPanel from './components/layout/InfoPanel';
import Navbar from './components/NavBar.js';
import DisplayMessage from './components/layout/DisplayMessage';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme= createMuiTheme({
  palette: {
    primary: {
      main: '#b33036',
    },
    secondary: {
      main: '#2f2f2f',
    },
  },
})


function App() {
  return (
    <div className="App">
    <ThemeProvider theme={theme}>
     <Navbar></Navbar>
     <div>
       <DisplayMessage></DisplayMessage>
       <InfoPanel></InfoPanel>
     </div>
    </ThemeProvider>
    </div>
  );
}

export default App;
