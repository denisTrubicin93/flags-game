import React, { memo, ReactNode } from 'react';
import { useTransition, animated } from 'react-spring';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      textAlign: 'left',
      alignContent: 'center',
      width: '100vw',
      height: '100vh',
      verticalAlign: 'top',
      backgroundColor: '#000000',
    },
  })
);

interface AppPageProps {
  children: ReactNode;
}

function AppPage({ children }: AppPageProps) {
  const classes = useStyles();
  const transitions = useTransition(true, null, {
    from: { opacity: 0, transform: 'translate3d(0,100%,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,100%,0)' },
  });

  return (
    <div className={classes.root}>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
              {children}
            </animated.div>
          )
      )}
    </div>
  );
}

export default memo(AppPage);
