import React, { CSSProperties, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Fancyborder from './svg/fancyborder.png';
import FancyborderActive from './svg/fancyborder_active.png';

const useStyles = makeStyles(() =>
  createStyles({
    normal: {
      height: 78,
      width: 78,
      background: `url(${Fancyborder}) no-repeat center`,
      overflow: 'hidden',
    },
    active: {
      height: 140,
      width: 140,
      background: `url(${FancyborderActive}) no-repeat center`,
      overflow: 'hidden',
    },
    icon: {
      maxWidth: '80%',
      maxHeight: '80%',
    },
  })
);

interface FancyBorderBoxProps {
  icon?: any;
  defaultActive?: boolean;
}

const FancyBorderBox: React.FC<FancyBorderBoxProps> = ({
  icon,
  defaultActive,
}) => {
  const classes = useStyles();

  const [active, setActive] = useState(false);

  React.useEffect(() => {
    setActive(defaultActive || false);
  }, [defaultActive]);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={active ? classes.active : classes.normal}
    >
      <img className={classes.icon} src={icon} />
    </Grid>
  );
};

export default FancyBorderBox;

export { FancyBorderBox };
