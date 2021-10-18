import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles({
  container: `
    position: absolute;
    width: 895px;
    height: 272px;
    left: 92px;
    top: 70px;
    padding: 0px 40px;
    background: linear-gradient(302.01deg, #250055 -6.72%, #5300FF 111.36%);
    border-radius: 20px;
  `,
  title: `
    font-family: Noto Sans JP;
    font-style: normal;
    font-weight: bold;
    font-size: 80px;
    line-height: 116px;
    letter-spacing: -0.04em;
    color: #FFFFFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  `,
  subTitle: `
    font-family: Noto Sans JP;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 52px;
    color: #FFFFFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  `,
});

interface CommonHeaderProps {
  title: string;
  subTitle: string;
  rightContent: ReactNode;
  className?: string;
}

export default function CommonHeader(props: CommonHeaderProps) {
  const { title, subTitle, rightContent, className } = props;
  const classes = useStyles();
  const cn = classNames(classes.container, className);

  return (
    <Grid container justify="space-between" alignItems="center" className={cn}>
      <Grid
        item
        xs
        container
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <Typography className={classes.title}>{title}</Typography>
        <Typography className={classes.subTitle}>{subTitle}</Typography>
      </Grid>
      {rightContent}
    </Grid>
  );
}
