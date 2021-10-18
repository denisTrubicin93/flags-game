import React, { FC } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  spinner: {
    boxShadow: `0 !important`,
    height: `30em`,
  }
})

const Spinner: FC = () => {
  const classes = useStyles();

  return (
  <Box className={classes.spinner}>
    <CircularProgress />読み込み中...
  </Box>
)};

export default Spinner;
