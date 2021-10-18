import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import classNames from 'classnames';
import hand from './svg/hand.svg';
import foot from './svg/footcontrol_icon.png';

const useStyles = makeStyles({
  container: `
    position: absolute;
    width: 1080px;
    height: 160px;
    left: 0px;
    top: 1065px;
    background: linear-gradient(302.01deg, #250055 -6.72%, #5300FF 111.36%);
    border-radius: 12px;
  `,
  title: `
    font-family: Noto Sans JP;
    font-style: normal;
    font-weight: bold;
    font-size: 47.7233px;
    line-height: 69px;
    letter-spacing: -0.04em;
    color: #ffffff;
    text-shadow: 0px 2.38616px 2.38616px rgba(0, 0, 0, 0.5);
  `,
});

interface MiddleBarProps {
  title: string;
  subTitle: string;
  rightContent?: ReactNode;
  className?: string;
}

export default function MiddleBar(props: MiddleBarProps) {
  const { title, subTitle, rightContent, className } = props;
  const classes = useStyles();
  const cn = classNames(classes.container, className);

  return (
    <Grid container direction="row" alignItems="center" className={cn}>
      <Grid
        item
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <Typography className={classes.title}>{title}</Typography>
        <Typography className={classes.title}>{subTitle}</Typography>
      </Grid>
      <Grid item alignItems="center">
        {rightContent || <img src={foot} alt="foot" />}
      </Grid>
    </Grid>
  );
}
