import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import corona from './coronawobkd.png'

const useStyles = makeStyles({
  root:
  {
    color: 'white',
    fontWeight: 700,
    fontSize: '2vw',
    margin: '30px',
    padding: '30px',
    wordSpacing: 10,
    backgroundColor: '#2f2f2f',
  }
  ,
});

export default function DisplayMessage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container >
        <Grid item xs={12} md={3}>
          <img src={corona} style={{ width: '100%' }} alt='corona pic'></img>
        </Grid>
        <Grid item xs={12} md={9}>
          <p >
            Corona Virus is spreading thick and fast. While Doctors and scientists are putting their lives on the line to fight the virus, unfortunately the common man still thinks its a joke.
            Even if today we take this virus seriously and adopt the prescribed precautionary measures many lives can be saved.
            <br></br>I hope following stats about covid virus will open your eyes.
            </p>
        </Grid>
      </Grid>
    </div>
  );
}