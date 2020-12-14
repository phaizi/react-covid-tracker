import React, {useEffect, useState } from 'react';
import './App.css';
import InfoPanel from './components/layout/InfoPanel';
import Navbar from './components/NavBar.js';
import DisplayMessage from './components/layout/DisplayMessage';
import { createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {GlobalDataContext, CountriesContext} from './constants/context.js';
import SelectCountry from './components/layout/SelectCountry.js';

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

// const useStyles = makeStyles((theme) => ({
//   root: { backgroundColor: '#c26334' }
// }))

const URL = "https://covid19.mathdro.id/api";


function App() {
  const [countriesArray, setCountries] = useState(['Global']);
  const [globalData, setGlobal] = useState({});
  const [dailyData, setDaily] = useState([]);
  const [selectedCountry, setCountry] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${URL}/${selectedCountry && "countries/"}${selectedCountry}`);
      const { confirmed, recovered, deaths } = await response.json();

      setGlobal({ ...globalData, [selectedCountry || "Global"]: { Confirmed: confirmed.value,  Deaths: deaths.value, Recovered: recovered.value } });
      console.log({ ...globalData, [selectedCountry || "Global"]: { Confirmed: confirmed.value, Recovered: recovered.value, Deaths: deaths.value } });


      // console.log(temp)
    }
    if (!globalData.hasOwnProperty(selectedCountry)) {
      fetchData()
    }
  }, [selectedCountry])

  useEffect(() => {
    async function fetchCountries() {
      const response = await fetch(`${URL}/countries`);
      const {countries} = await response.json();
      setCountries([... countriesArray, ... countries.map((country) => country.name)])
      const count = countries.map((country) => country.name)
      // setCountries(result.countries);
      console.log(count)
      // return result
    }
    fetchCountries();

  }, [])
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CountriesContext.Provider value={{countriesArray, selectedCountry, setCountry}}>
          <Navbar></Navbar>
          <div>
            <DisplayMessage></DisplayMessage>
            <GlobalDataContext.Provider value={globalData}>
              <InfoPanel></InfoPanel>
            </GlobalDataContext.Provider>
            <SelectCountry></SelectCountry>
          </div>
        </CountriesContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
