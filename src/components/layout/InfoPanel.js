import React,{useContext} from 'react';
import picAddresses from '../../constants/picsAddress.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {GlobalDataContext, CountriesContext} from '../../constants/context.js';
import CssBaseline from "@material-ui/core/CssBaseline";



const useStyles = makeStyles((theme) => ({
    root: {
        // margin: theme.spacing(10)


    },
    ConfirmedLabel: {backgroundColor: theme.palette.warning.main},
    DeathsLabel: {backgroundColor: theme.palette.primary.main},
    RecoveredLabel: {backgroundColor: theme.palette.success.main},
    
    // {color: 'secondary'}],
    card: {
        maxWidth: 345,
        // margin: theme.spacing(3)
        margin: '30px',
    },
    media: {
        height: 150,
    },
}));


export default function InfoPanel() {
    const globalData = useContext(GlobalDataContext);
    const {selectedCountry} = useContext(CountriesContext);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container justify="center">

                {Object.keys(globalData.global??[]).map((label, index) => (
                    <Grid key={label} item xs={12} sm={5} md={3}>
                        <Card className={classes.card}>
                            <CardContent className={classes[`${label}Label`]} >
                                <Typography  variant="h4" >{label}</Typography>
                            </CardContent>
                            <CardMedia  className={classes.media} image={picAddresses[index]}></CardMedia>
                            <CardContent >
                                <Typography  variant="h4">{globalData[selectedCountry||"global"][label].toString().replace(/\d(?=(\d{3})+$)/g, "$&,")}</Typography>
                                <Typography  variant="h6" color="textSecondary">{`Number of ${label.replace(/s/, '')} Cases of Covid-19`}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>


    )
}