import React, { memo, ReactNode } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ArrowUp from './icons/ArrowUp';

const useStyles = makeStyles(() =>
  createStyles({
    startTour: {
      marginTop: 42,
      textAlign: 'center',
      width: '100%',
    },
    icon: {
      width: '100%',
      height: 16,
      '& svg': {
        margin: 'auto',
        display: 'block',
      },
    },
    text: {
      marginTop: 18,
      fontSize: 30,
      lineHeight: '32px',
      height: 32,
    },
  })
);

type BottomNavProps = {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  children: NonNullable<ReactNode>;
};

function BottomNav({ children, onClick }: BottomNavProps) {
  const classes = useStyles();

  return (
    <div className={classes.startTour} onClick={onClick}>
      <div className={classes.icon}>
        <ArrowUp />
      </div>
      <div className={classes.text}>{children}</div>
    </div>
  );
}

export default memo(BottomNav);
