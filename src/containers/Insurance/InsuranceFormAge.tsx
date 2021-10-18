import React from 'react';

import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import AppPage from '../../components/common/AppPage';

import { ProfilePanel } from './ProfilePanel';
import { RootState } from '../../features';
import { getAgeLabel } from '../../features/Person/models';
import { setAge } from '../../features/Person/reducer';

import { PrevBtn, RequestHelpBtn } from '../../components/common/button';
import { HoverEffectBtn } from '../../components/common/button/HoverEffectBtn';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      paddingLeft: 48,
      height: 96,
      marginTop: 24,
      marginBottom: 64,
      fontFamily: 'Noto Sans JP',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '96px',
      lineHeight: '110%',
      verticalAlign: 'middle',
    },
    question: {
      fontFamily: 'Noto Sans JP',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '56px',
      lineHeight: '110%',
      marginTop: '50px',
    },
    button: {
      width: '301px',
      height: '301px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    value: {
      fontFamily: 'Noto Sans JP',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '72px',
      lineHeight: '100%',
      color: '#FFF',
      pointerEvents: 'none',
    },
    unknown: {
      fontFamily: 'Noto Sans JP',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '72px',
      lineHeight: '100%',
      opacity: 0.25,
      color: '#FFF',
      pointerEvents: 'none',
      justifyContent: 'center',
    },
    appHeader: {
      display: 'inline-block',
      top: 0,
      left: 0,
      height: '160px',
      '& .vector': `
        /* Vector */


        position: absolute;
        left: 90px;
        top: 66px;
        display: 'inline-block';
        `,
      '& .request_help': `
        /* Request_Help */


        display: 'inline-block';
        position: absolute;
        width: 400px;
        height: 114px;
        left: 647px;
        top: 44px;

        border-radius: 100px;
      `,
    },
  })
);

function InsuranceFormAge() {
  const history = useHistory();
  const classes = useStyles();

  const profile = useSelector((state: RootState) => state.person.profile);
  const dispatch = useDispatch();

  const ageList = [
    20,
    30,
    40,
    50,
    60,
  ];

  return (
    <AppPage>
      <Box className={classes.appHeader}>
        <Box className="vector">
          <PrevBtn
            onTap={(e: any) => {
              history.push('insurance');
            }}
          />
        </Box>
        <Box className="request_help">
          <RequestHelpBtn />
        </Box>
      </Box>
      <div className={classes.title}>保険シミュレーション</div>
      <ProfilePanel profile={profile} fixed="age" />
      <Box>
        <Grid container justify="center" spacing={8}>
          <Grid item xs={12} container justify="center" alignItems="center">
            <Typography className={classes.question} component="span">
              あなたの年齢は？
            </Typography>
          </Grid>
          <Grid item xs={11} container spacing={8}>
            {ageList.map((item, index) => {
              return (
                <Grid
                  key={`${index.toString()}`}
                  item
                  xs={6}
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <HoverEffectBtn
                    radius={50}
                    hover={true}
                    onTap={() => {
                      dispatch(setAge(item));
                      history.push('insurance');
                    }}
                  >
                    <Box className={classes.button}>
                      {item ? (
                        <Typography className={classes.value} component="span">
                          {getAgeLabel(item)}
                        </Typography>
                      ) : (
                        <Typography className={classes.unknown} component="span">
                          —
                        </Typography>
                      )}
                    </Box>
                  </HoverEffectBtn>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Box>
    </AppPage>
  );
}

export default InsuranceFormAge;
