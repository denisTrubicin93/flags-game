import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useGesture } from 'react-use-gesture';
import { useImmer, useImmerReducer } from 'use-immer';
import GestureClick from './svg/GestureClick.inline.svg';
// import GestureClick from '../../components/common/handguides/Click';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      boxSizing: 'border-box',
      backgroundColor: '#000',
      padding: '12px 56px 32px 56px',
    },
    t1: {
      fontFamily: 'IBM Plex Sans',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '96px',
      lineHeight: '110%',
      color: '#FFF',
    },
    t2: {
      fontFamily: 'IBM Plex Sans',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '60px',
      lineHeight: '100%',
      color: '#FFF',
    },
    t3: {
      fontFamily: 'IBM Plex Sans',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '56px',
      lineHeight: '110%',
      color: '#FFF',
    },
    value: {
      fontFamily: 'IBM Plex Sans',
      fontStyle: 'bold',
      fontWeight: 'bold',
      fontSize: '40px',
      lineHeight: '110%',
      color: '#FFF',
      pointerEvents: 'none',
    },
    unknown: {
      fontFamily: 'IBM Plex Sans',
      fontStyle: 'bold',
      fontWeight: 'normal',
      fontSize: '40px',
      lineHeight: '110%',
      opacity: 0.25,
      color: '#FFF',
      pointerEvents: 'none',
    },
    label: {
      fontFamily: 'IBM Plex Sans',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '32px',
      lineHeight: '110%',
      color: '#FFF',
      pointerEvents: 'none',
    },
    selected: {
      border: '4px solid rgba(255, 255, 255, 1.0)',
      borderRadius: '32px',
      width: '220px',
      height: '212px',
    },
    notselected: {
      border: '2px solid rgba(255, 255, 255, 0.25)',
      borderRadius: '32px',
      width: '220px',
      height: '212px',
    },
  })
);

type SituationProps = {
  situation: any;
};

function Situation(props: SituationProps) {
  const classes = useStyles();
  const [form, setForm] = useState([
    {
      label: '年齢',
      value: `${props.situation.age}代`,
    },
    {
      label: '性別',
      value: `${props.situation.genderJa}`,
    },
    {
      label: '結婚',
      value: `${props.situation.marriageJa}`,
    },
    {
      label: 'お子様',
      value: `${props.situation.haveChildrenJa}`,
    },
  ]);
  const clickGuide = useRef(null);

  const gesture = useGesture({
    onDrag: ({ event, tap, args }) => {
      if (tap) {
        console.log('onClick', args);
      }
    },
    onPointerEnter: ({ event, args }) => {
      console.log('onPointerEnter: ', event.target);
      console.log('onPointerEnter: ', args);
      if (event.target) {
        const elem = event.target as HTMLDivElement;
        elem.style.border = '10px solid rgba(255, 255, 255, 0.5)';
        console.log('clickGuide: ', clickGuide.current);
        if (clickGuide.current !== null) {
          clickGuide.current.style.visibility = 'visible';
          const clientRect = elem.getBoundingClientRect();
          console.log('clientRect: ', clientRect);
          clickGuide.current.style.top = `${
            clientRect.top - 0.5 * clientRect.height
          }px`;
          clickGuide.current.style.left = `${
            clientRect.left + 0.4 * clientRect.width
          }px`;
        }
      }
    },
    onPointerLeave: ({ event }) => {
      console.log('onPointerLeave: ', event.target);
      if (event.target) {
        const elem = event.target as HTMLDivElement;
        elem.style.border = '2px solid rgba(255, 255, 255, 0.25)';
        if (clickGuide.current !== null) {
          clickGuide.current.style.visibility = 'hidden';
        }
      }
    },
    // onHover: ({ event }) => {
    //   console.log('onHover: ', event.target);
    // },
  });

  return (
    <div className={classes.root}>
      <Box
        ref={clickGuide}
        style={{ position: 'absolute', pointerEvents: 'none' }}
      >
      </Box>
      <Grid container justify="space-between">
        {form.map((item, index) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <Grid
              key={`form_${index.toString()}`}
              item
              container
              direction="column"
              justify="space-evenly"
              alignItems="center"
              style={{
                border: '2px solid rgba(255, 255, 255, 0.25)',
                borderRadius: 32,
                width: 220,
                height: 212,
              }}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...gesture(index)}
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
          );
        })}
      </Grid>
    </div>
  );
}

export default Situation;
