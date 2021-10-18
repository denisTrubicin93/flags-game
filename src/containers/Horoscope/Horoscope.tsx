import React, { memo, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SvgIcon from "@material-ui/core/SvgIcon";
import HoroscopeItem from '../../components/horoscope/HoroscopeItem';
import HoroScopeIcon from '../../components/horoscope/HoroScopeIcon';

const useStyles = makeStyles(() => ({
  root: {
    boxSizing: 'border-box',
    border: '2px solid rgba(255, 255, 255, 0.25)',
    borderRadius: '48px',
    padding: '32px 32px 32px 40px',
    height: '476px',
    flexGrow: 1,
  },
  divider: {
    background: '#FFF',
    opacity: '0.5',
  },
}));

const T1 = withStyles({
  root: {
      fontFamily: "IBM Plex Sans",
      fontWeight: "bold",
      fontStyle: "normal",
      fontSize: "40px",
      lineHeight: "110%",
      color: "#FFF"
  }
})(Typography);

const T2 = withStyles({
  root: {
      fontFamily: "IBM Plex Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "32px",
      lineHeight: "110%",
      color: "#FFF"
  }
})(Typography);

function Horoscope() {
  const classes = useStyles();

  const [horoscopeData, setHoroscopeData] = useState({
      name: '',
      icon: '',
      love: 0,
      money: 0,
      work: 0,
      overall: 0,
  });

  let request = function () {
    setHoroscopeData({
      name: 'しし座',
      icon: '',
      love: 3,
      money: 2,
      work: 3,
      overall: 2,
    });
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={4}>
        <Grid item container>
          <Grid item xs container direction="column" justify="space-between">
            <T2>
            今日の占い
            </T2>
            <T1>
              {horoscopeData.name}
            </T1>
          </Grid>
          <Grid item>
            <SvgIcon component={HoroScopeIcon} />
          </Grid>
        </Grid>
        <Grid item container direction="column" spacing={2}>
          <HoroscopeItem title="恋愛運" value={horoscopeData.love} showDivider = {true} />
          <HoroscopeItem title="金運" value={horoscopeData.money} showDivider = {true} />
          <HoroscopeItem title="仕事運" value={horoscopeData.work} showDivider = {true} />
          <HoroscopeItem title="総合" value={horoscopeData.overall} showDivider = {false} />
        </Grid>
      </Grid>
    </div>
  );
}

export default memo(Horoscope);
