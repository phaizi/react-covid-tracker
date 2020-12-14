import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CountriesContext } from '../constants/context.js';
import Select from '@material-ui/core/Select';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    //   menuButton: {
    //     marginRight: theme.spacing(2),
    //   },
    title: {
        flexGrow: 1,
        display: 'none',
        // position: 'relative',
        // left: '100px',
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
        // minWidth:300,
        // width: '100%',
        [theme.breakpoints.down('md')]: {
            marginLeft: theme.spacing(1),
            width: '100%',
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(1),
            minWidth: '90vw',
        }
    },
    // searchIcon: {
    //     padding: theme.spacing(0, 2),
    //     height: '100%',
    //     position: 'absolute',
    //     pointerEvents: 'none',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // inputRoot: {
    //     color: 'inherit',
    // },
    // inputInput: {
    //     padding: theme.spacing(1, 0, 1, 0),
    //     minWidth: '150px',
    //     // vertical padding + font size from searchIcon
    //     paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
    //     transition: theme.transitions.create('width'),
    //     width: '100%',
    //     [theme.breakpoints.up('sm')]: {
    //         width: '12ch',
    //         '&:focus': {
    //             width: '20ch',
    //         },
    //     },
    // },
    // textBox:{
    //     [theme.breakpoints.up('sm')]: {
    //         marginLeft: theme.spacing(1),
    //         width: 'auto',
    //     },
    //     width: '100%',
    // }
}));


export default function NavBar() {
    const classes = useStyles();
    const { countriesArray, selectedCountry, setCountry } = useContext(CountriesContext);
    const handleChange = (e) => {

        const value = e.target.textContent || e.target.defaultValue;

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
                    {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
                    <Typography className={classes.title} variant="h6" noWrap>
                        Covid Tracker
          </Typography>
                    {/* <div className={classes.search}> */}
                    <div style={{ minWidth: 300 }}>
                        {/* <div className={classes.searchIcon}> */}
                        {/* <IconButton> */}
                        {/* <SearchIcon /> */}
                        {/* <SearchTwoToneIcon /> */}
                        {/* </IconButton> */}
                        {/* </div> */}


                        {/* <IconButton color="inherit" aria-label="search country" component="span">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            placeholder="Search Country…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        /> */}
                        <Autocomplete
                            onChange={handleChange} // when we click
                            onSelect={handleChange} // when we press key
                            value={selectedCountry}
                            id="combo-box-demo"
                            options={countriesArray}
                            getOptionLabel={(option) => option}
                            //   style={{ width: 300 }}
                            renderInput={(params) => <TextField className={classes.search} disableUnderline={true} {...params} label="Search Country…" variant="filled" />}
                        />
                    </div>
                </Toolbar>
            </AppBar>


        </div>
    );
}