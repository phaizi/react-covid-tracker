import React, { useContext } from 'react';
import picAddresses from '../../constants/picsAddress.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { GlobalDataContext, CountriesContext } from '../../constants/context.js';
import CountUp from 'react-countup';


const useStyles = makeStyles((theme) => ({
    ConfirmedLabel: { backgroundColor: theme.palette.warning.main },
    DeathsLabel: { backgroundColor: theme.palette.primary.main },
    RecoveredLabel: { backgroundColor: theme.palette.success.main },

    card: {
        maxWidth: 345,
        margin: '30px',
    },

    media: {
        height: 150,
    },

    mediaLoad: {
        height: 150,
        backgroundColor: 'grey'
    }
}));


export default function InfoPanel({ isLoading }) {
    const globalData = useContext(GlobalDataContext);
    const { selectedCountry } = useContext(CountriesContext);
    const classes = useStyles();

    return (
        <div>
            <Grid container justify="center">

                {['Confirmed', 'Deaths', 'Recovered'].map((label, index) => (
                    <Grid key={label} item xs={12} sm={5} md={3}>
                        <Card className={classes.card}>
                            <CardContent className={classes[`${label}Label`]} >
                                <Typography variant="h4" >{label}</Typography>
                            </CardContent>
                            <CardMedia className={isLoading ? classes.mediaLoad : classes.media} image={isLoading ? '/covidLoader.png' : picAddresses[index]}></CardMedia>
                            <CardContent >
                                <Typography variant="h4">
                                    {isLoading ? 'Loading...' : <CountUp end={+globalData?.[selectedCountry || "Global"]?.[label]} separator={','} />}
                                </Typography>
                                <Typography variant="h6" color="textSecondary">{`Number of ${label.replace(/s/, '')} Cases of Covid-19`}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>


    )
}