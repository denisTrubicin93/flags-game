import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../features';

import { setAge, setGender } from '../../features/Person/reducer';

import {
  PrevBtn,
  RequestHelpBtn,
  HoverEffectBtn,
  MenuBtn,
  FancyBorderBtn,
} from '../../components/common/button';

import downArrow from './assets/down-arrow.png';
import upArrow from './assets/up-arrow.png';
import returnArrow from './assets/return-arrow.png';
import confirmation from './assets/confirmation.png';

const useStyles = makeStyles(() =>
  createStyles({
    app_content: {
      width: '1080px',
      height: '1920px',
      top: 0,
      left: 0,
      position: 'fixed',
      '& .background': `
        position: absolute;
        width: 1080px;
        height: 1920px;
        left: 0px;
        background: radial-gradient(50% 50% at 50% 50%, #2C2F37 0%, #000000 100%);
        border-radius: 70px;
        z-index: -1;
      `,
      '& .result_container': `
        position: absolute;
        top: 133px;
      `,
      '& .result_container .title': `
        position: absolute;
        width: 602px;
        height: 224px;
        top: 0;
        left: 239px;

        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: normal;
        font-size: 96px;
        line-height: 100%;
        /* or 96px */

        text-align: center;

        /* White */

        color: #FFFFFF;
      `,
      '& .select_container': `
        position: absolute;
        width: 828px;
        height: 1441.81px;
        left: 129px;
        top: 428px;
      `,
      '& .select_container .L1': `
        position: absolute;
        width: 350px;
        height: 602px;
        left: calc(129px - 129px);
        top: calc(428px - 428px);
      `,
      '& .select_container .L2': `
        position: absolute;
        width: 350px;
        height: 602px;
        left: calc(129px - 129px);
        top: calc(1259px - 428px);
      `,
      '& .select_container .R1': `
        position: absolute;
        width: 350px;
        height: 602px;
        left: calc(607px - 129px);
        top: calc(428px - 428px);
      `,
      '& .select_container .R2': `
        position: absolute;
        width: 350px;
        height: 602px;
        left: calc(607px - 129px);
        top: calc(1259px - 428px);
      `,
    },
  })
);

const age = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function InsuranceChangeNumber(props: any) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const decade = props.location.state.decade;
  const profile = useSelector((state: RootState) => state.person.profile);
  const [deltaAge, setDeltaAge] = useState<number>(1);

  return (
    <>
      <Box className={classes.app_content}>
        <Grid
          className="result_container"
          container
          direction="column"
          alignItems="center"
        >
          <Grid item style={{ marginBottom: 177 }}>
            <Typography className="title">

              年齢：{decade + deltaAge}
            </Typography>
          </Grid>
        </Grid>
        <Box className="background" />
        <Box className="select_container">
          <Box className="L1">
            <FancyBorderBtn
              className="fitness"
              size="large"
              onTap={(e: any) => {
                setDeltaAge(deltaAge - 1);
              }}
              icon={downArrow}
              title="下げる"
              type={['L1']}
            />
          </Box>
          <Box className="R1">
            <FancyBorderBtn
              className="fitness"
              size="large"
              onTap={(e: any) => {
                setDeltaAge(deltaAge + 1);
              }}
              icon={upArrow}
              title="上げる"
              type={['R1']}
            />
          </Box>
          <Box className="L2">
            <FancyBorderBtn
              className="fitness"
              size="large"
              onTap={(e: any) => {
                history.push({
                  pathname: '/insuranceChangeAge'
                })
              }}
              icon={returnArrow}
              title="戻る"
              type={['L2']}
            />
          </Box>
          <Box className="R2">
            <FancyBorderBtn
              className="fitness"
              size="large"
              onTap={(e: any) => {
                let age = decade + deltaAge;
                if (age < 0) age = 0;
                if (age > 85) age = 85;
                dispatch(setAge(age));
                history.push({
                  pathname: '/insuranceDetectResult'
                })
              }}
              icon={confirmation}
              title="確認"
              type={['R2']}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default InsuranceChangeNumber;
