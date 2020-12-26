import React, { useContext } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { CountriesContext } from '../../constants/context.js';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 315,
    fontSize: 25,
    color: 'white',
    backgroundColor: theme.palette.secondary.main
  },

  item: {
    backgroundColor: theme.palette.primary.main,
    color: 'black'
  }
}));

export default function SelectCountry({ setLoading }) {

  const classes = useStyles();
  const { countriesArray, selectedCountry, setCountry } = useContext(CountriesContext);

  const handleChange = (event) => {
    setLoading(true);
    setCountry(event.target.value)
  };

  return (
    <Select className={classes.formControl}
      labelId="demo-simple-select-filled-label"
      id="demo-simple-select-filled"
      value={selectedCountry || 'Global'}
      onChange={handleChange}
    >
      {countriesArray.map((country) => (
        <MenuItem className={classes.item} key={country} value={country}>{country}</MenuItem>
      ))}
    </Select>
  );
}