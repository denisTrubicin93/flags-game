
import React , { memo } from 'react'
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles'
import ArrowUp from './svg/ArrowUp'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() =>
  createStyles({
    swipeApplication: {
      textAlign: 'center',
      position:'fixed',
      // marginTop: '560px',
      width: '100vw',
      left: 0,
      bottom: 48,
      lineHeight: '1.0em'
    }
  }),
)
const SwipeTitle = withStyles({
  root: {
      fontFamily: "IBM Plex Sans",
      fontWeight: "normal",
      fontStyle: "normal",
      fontSize: "48px",
      lineHeight: "100%",
      color: "#FFFFFF",
      marginTop: "26px"
  }
})(Typography);
type SwipeApplicationsProps = {
  onClick: (e: React.MouseEvent<HTMLElement>) => void,
}

function SwipeApplications(props: SwipeApplicationsProps) {
  const classes = useStyles()

  return (
    <div className={classes.swipeApplication} >
      <div onClick={props.onClick}><ArrowUp /></div>
      <SwipeTitle onClick={props.onClick}>アプリ</SwipeTitle>
    </div>
  )

}

export default memo(SwipeApplications)
