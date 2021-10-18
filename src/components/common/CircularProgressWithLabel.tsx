import React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { Box, Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const colors = ['#FF4444', '#E7D963', '#42DC76'];

const useStyles = makeStyles(() =>
  createStyles({
    topCircularProgress: {
      color: (props: any) => {
        let newColors = colors.slice();
        if (props.colorReverse) {
          newColors.reverse();
        }
        if (props.value < 33.333) {
          return newColors[0];
        } else if (props.value < 33.333 * 2) {
          return newColors[1];
        } else {
          return newColors[2];
        }
      },
      zIndex: 1
    },
    downCircularProgress: {
      color: '#F2F2F2',
    },
    centerLabel: `
      font-family: Noto Sans JP;
      font-style: normal;
      font-weight: 500;
      font-size: 53.95px;
      line-height: 54px;
      text-align: center;
      color: #FFFFFF;
    `,
    downLabel: `
      font-family: Noto Sans JP;
      font-style: normal;
      font-weight: 500;
      font-size: 32.9694px;
      line-height: 36px;
      text-align: center;
      color: #FFFFFF;
      margin-top: 10px
    `,
  })
);

export default function CircularProgressWithLabel(
  props: CircularProgressProps & {
    centerLabel: number;
    centerLabelStyle?: CSSProperties;
    downLabel: string;
    downLabelStyle?: CSSProperties;
    colorReverse?: boolean;
  }
) {
  const { centerLabel, downLabel, centerLabelStyle, downLabelStyle, ...rest } = props;
  const classes = useStyles(props);

  return (
    <Box>
      <Grid container direction="column" alignItems="center">
        <Box position="relative" display="inline-flex">
          <CircularProgress
            className={classes.topCircularProgress}
            size={150}
            variant="determinate"
            {...rest}
          />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress
              className={classes.downCircularProgress}
              size={150}
              variant="determinate"
              {...props}
              value={100}
            />
          </Box>
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography className={classes.centerLabel} style={centerLabelStyle}>
              {centerLabel}
            </Typography>
          </Box>
        </Box>
        {downLabel && (
          <Typography className={classes.downLabel} style={downLabelStyle}>{downLabel}</Typography>
        )}
      </Grid>
    </Box>
  );
}
