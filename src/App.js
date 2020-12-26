import React, { useEffect, useState } from 'react';
import './App.css';
import InfoPanel from './components/layout/InfoPanel';
import Navbar from './components/NavBar.js';
import DisplayMessage from './components/layout/DisplayMessage';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from "@material-ui/core";
import { GlobalDataContext, CountriesContext, DailyDataContext } from './constants/context.js';
import SelectCountry from './components/layout/SelectCountry.js';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Graphs from './components/layout/Graphs.js';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b33036',
    },
    secondary: {
      main: '#2f2f2f',
    },
  },
})

const useStyles = makeStyles(() => ({
  btnMargin: {
    margin: theme.spacing(2),
    position: 'relative ',
    bottom: '10px',
  },
  btnSelected: {
    backgroundColor: theme.palette.primary.main,
  },
  graphWidth: {
    [theme.breakpoints.up('md')]: {
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  }
}))

const URL = "https://covid19.mathdro.id/api";


function App() {
  const [countriesArray, setCountries] = useState(['Global']);
  const [globalData, setGlobal] = useState({});
  const [dailyData, setDaily] = useState([]);
  const [selectedCountry, setCountry] = useState("Global");
  const [graphPicker, setGraph] = useState("Bar");
  const [isLoading, setLoading] = useState(true);

  const classes = useStyles();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));


  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${URL}/${(selectedCountry === "Global") ? "" : `countries/${selectedCountry}`}`);
      const { confirmed, recovered, deaths } = await response.json();
      const temp = { ...globalData, [selectedCountry || "Global"]: { Confirmed: confirmed.value, Deaths: deaths.value, Recovered: recovered.value } }
      setGlobal(temp);
      setLoading(false);
    }
    if (!globalData.hasOwnProperty(selectedCountry)) {
      fetchData()
    } else {
      setLoading(false);
    }
  }, [selectedCountry])

  useEffect(() => {
    async function fetchCountries() {
      const response = await fetch(`${URL}/countries`);
      const { countries } = await response.json();
      setCountries([...countriesArray, ...countries.map((country) => country.name)])
    }
    fetchCountries();
  }, [])

  useEffect(() => {
    async function fetchDailyData() {
      const response = await fetch(`${URL}/daily`);
      const result = await response.json();
      const data = result.map((label) => {
        const { deaths, confirmed, reportDate } = label;
        return { Deaths: deaths.total, Confirmed: confirmed.total, reportDate };
      })
      setDaily(data);
    }
    fetchDailyData();
  }, [])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CountriesContext.Provider value={{ countriesArray, selectedCountry, setCountry }}>
          <Navbar></Navbar>
          <div>
            <DisplayMessage></DisplayMessage>
            <GlobalDataContext.Provider value={globalData}>
              <InfoPanel isLoading={isLoading}></InfoPanel>
              <div >
                <SelectCountry setLoading={setLoading}></SelectCountry>
                <ButtonGroup className={classes.btnMargin}
                  size={isSmallScreen ? 'small' : 'large'}
                  variant="contained" color="secondary" aria-label="contained primary button group">
                  <Button color={'Line' === graphPicker ? 'primary' : ''} onClick={() => { setGraph('Line') }} disabled={selectedCountry !== 'Global'}>Line</Button>
                  <Button color={'Bar' === graphPicker ? 'primary' : ''} onClick={() => { setGraph('Bar') }}>Bar</Button>
                  <Button color={'Doughnut' === graphPicker ? 'primary' : ''} onClick={() => { setGraph('Doughnut') }}>Doughnut</Button>
                  <Button color={'Pie' === graphPicker ? 'primary' : ''} onClick={() => { setGraph('Pie') }}>Pie</Button>
                  <Button color={'Polar' === graphPicker ? 'primary' : ''} onClick={() => { setGraph('Polar') }}>Polar</Button>
                </ButtonGroup>
              </div>
              <DailyDataContext.Provider value={dailyData}>
                <div className={classes.graphWidth}>
                  <Graphs isLoading={isLoading} type={graphPicker} setType={setGraph} ></Graphs>
                </div>
              </DailyDataContext.Provider>
            </GlobalDataContext.Provider>
          </div>
        </CountriesContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
