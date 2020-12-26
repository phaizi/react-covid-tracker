import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CountriesContext } from '../constants/context.js';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        fontWeight: 700,
        fontSize: 40,

        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        [theme.breakpoints.down('md')]: {
            marginLeft: theme.spacing(1),
            width: '100%',
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(1),
            minWidth: '90vw',
        }
    },

}));


export default function NavBar() {
    const classes = useStyles();
    const { countriesArray, selectedCountry, setCountry } = useContext(CountriesContext);
    const handleChange = (e) => {

        let value = e.target.textContent || (e.target.defaultValue ?? '');
        //??'' is placed becoz it was giving undefined error while fetching
        value = value[0]?.toUpperCase() + value.slice(1);
        // done so that search becomes case insensitive
        if (value === countriesArray.find((country) => {
            return country === value;
        })) {
            setCountry(value)
        }
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Covid Tracker
          </Typography>
                    <div style={{ minWidth: 300 }}>
                        <Autocomplete
                            onChange={handleChange} // when we click
                            onSelect={handleChange} // when we press key
                            value={selectedCountry === 'Global' ? '' : selectedCountry}
                            id="combo-box-demo"
                            options={countriesArray}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => <TextField className={classes.search}  {...params} label="Search Country…" variant="filled" />}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}