import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: '20px',
      background: 'linear-gradient(302.01deg, #250055 -6.72%, #5300FF 111.36%)',
      margin: '400px 90px 0px 90px',
      padding: theme.spacing(2),
      position: 'relative',
    },
  })
);

type CardProps = {
  left?: any;
  right?: any;
  leftxs?: any;
  rightxs?: any;
};

export default function Card(props: CardProps) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid item container alignItems="center">
        <Grid item xs={props.leftxs}>
          {props.left}
        </Grid>
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          xs={props.rightxs}
        >
          {props.right}
        </Grid>
      </Grid>
    </Box>
  );
}
