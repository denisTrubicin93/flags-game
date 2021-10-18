import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import {
  Profile,
  getAgeLabel,
  getGenderLabel,
  getMarriageLabel,
  getHaveChildrenLabel,
} from '../../features/Person/models';
import { HoverEffectBtn } from '../../components/common/button';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      boxSizing: 'border-box',
      backgroundColor: '#000',
      padding: '12px 56px 32px 56px',
    },
    button: {
      width: '210px',
      height: '202px',
    },
    buttonSelected: {
      width: '210px',
      height: '202px',
    },
    value: {
      fontFamily: 'Noto Sans JP',
      fontStyle: 'bold',
      fontWeight: 'bold',
      fontSize: '40px',
      lineHeight: '110%',
      color: '#FFF',
      pointerEvents: 'none',
    },
    unknown: {
      fontFamily: 'Noto Sans JP',
      fontStyle: 'bold',
      fontWeight: 'bold',
      fontSize: '40px',
      lineHeight: '110%',
      opacity: 0.25,
      color: '#FFF',
      pointerEvents: 'none',
    },
    label: {
      fontFamily: 'Noto Sans JP',
      fontStyle: 'bold',
      fontWeight: 'normal',
      fontSize: '32px',
      lineHeight: '110%',
      color: '#FFF',
      pointerEvents: 'none',
    },
  })
);

type ProfileProps = {
  profile: Profile;
  fixed?: 'age' | 'gender' | 'marriage' | 'haveChildren';
};

function ProfilePanel({ profile, fixed }: ProfileProps) {
  const classes = useStyles();

  const history = useHistory();

  const [form, setForm] = useState([
    {
      key: 'age',
      label: '年齢',
      value: getAgeLabel(profile.age),
      route: 'insuranceFormAge',
    },
    {
      key: 'gender',
      label: '性別',
      value: getGenderLabel(profile.gender),
      route: 'insuranceFormGender',
    },
    {
      key: 'marriage',
      label: '結婚',
      value: getMarriageLabel(profile.marriage),
      route: 'insuranceFormMarriage',
    },
    {
      key: 'haveChildren',
      label: 'お子様',
      value: getHaveChildrenLabel(profile.haveChildren),
      route: 'insuranceFormHaveChildren',
    },
  ]);

  return (
    <div className={classes.root}>
      <Grid container justify="space-between">
        {form.map((item, index) => {
          return (
            <HoverEffectBtn
              key={`btn-${index}`}
              radius={50}
              hover={fixed === undefined}
              selected={fixed === item.key}
              onTap={() => {
                history.push(item.route);
              }}
            >
            <Grid
              key={item.key}
              item
              container
              direction="column"
              justify="space-evenly"
              alignItems="center"
              className={
                fixed === item.key ? classes.buttonSelected : classes.button
              }
            >
              <Typography className={classes.label} component="span">
                {item.label}
              </Typography>
              {item.value ? (
                <Typography className={classes.value} component="span">
                  {item.value}
                </Typography>
              ) : (
                <Typography className={classes.unknown} component="span">
                  —
                </Typography>
              )}
            </Grid>
            </HoverEffectBtn>
          );
        })}
      </Grid>
    </div>
  );
}

export default ProfilePanel;

export { ProfilePanel };
