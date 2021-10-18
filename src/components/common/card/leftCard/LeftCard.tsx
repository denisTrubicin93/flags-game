import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      fontFamily: 'Noto Sans JP',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '30px',
      lineHeight: '36px',
      color: '#FFFFFF',
      textAlign: 'center',
      textShadow: '0px 4px 4px rgba(0, 0, 0, 0.5)',
    },
    title: {
      fontFamily: 'Noto Sans JP',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '80px',
      lineHeight: '116px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      color: '#FFFFFF',
      letterSpacing: '-0.04em',
      textShadow: '0px 4px 4px rgba(0, 0, 0, 0.5)',
    },
  })
);

type CardProps = {
  title?: string;
  content?: string;
};

export default function Card(props: CardProps) {
  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="center">
      <Typography className={classes.title}>{props.title}</Typography>
      <Typography className={classes.content}>{props.content}</Typography>
    </Grid>
  );
}
