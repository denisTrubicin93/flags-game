import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import StarEmptyIcon from './StarEmptyIcon';
import StarFullIcon from './StarFullIcon';

const useStyles = makeStyles(() => ({
  divider: {
    background: '#FFF',
    opacity: '0.5',
  },
}));

const T = withStyles({
  root: {
      fontFamily: "IBM Plex Sans",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "32px",
      lineHeight: "110%",
      color: "#FFF"
  }
})(Typography);

const StyledRating = withStyles({
  iconFilled: {
    color: '#FFF'
  }
})(Rating);

function HoroScopeItem(props: any) {
  const classes = useStyles();

  return (
    <Grid item container direction="column" spacing={2}>
      <Grid item container justify="space-between">
        <T>
          {props.title}
        </T>
        <StyledRating
          readOnly
          max={3}
          value={props.value}
          size="large"
          icon={<StarFullIcon/>}
          emptyIcon={<StarEmptyIcon/>}
        />
      </Grid>
      {
        props.showDivider ?
        <Grid item>
          <Divider className={classes.divider} />
        </Grid>
        :
        ''
      }
    </Grid>
  );
}

export default memo(HoroScopeItem);
