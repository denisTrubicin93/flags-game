import React, { CSSProperties, useState, useMemo } from 'react';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box } from '@material-ui/core';
import classNames from 'classnames';
import { useSpring, animated } from 'react-spring';
import { Progress } from 'react-sweet-progress';

import FancyborderLarge from './assets/fancyborder_large.png';
import FancyborderLargeActive from './assets/fancyborder_large_active.png';
import FancyborderNormal from './assets/fancyborder_normal.png';
import FancyborderNormalActive from './assets/fancyborder_normal_active.png';
import FancyborderSmall from './assets/fancyborder_small.png';
import FancyborderSmallActive from './assets/fancyborder_small_active.png';
import FancyborderXSmall from './assets/fancyborder_xsmall.png';
import FancyborderXSmallActive from './assets/fancyborder_xsmall_active.png';
import ImgBtn from './ImgBtn';
import TopLeft from '../svg/gesture/L1.png';
import DownLeft from '../svg/gesture/L2.png';
import TopRight from '../svg/gesture/R1.png';
import DownRight from '../svg/gesture/R2.png';

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      '& .FancyBorderBtn_title': `
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 40px;
        line-height: 58px;
        /* identical to box height */

        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: -0.04em;

        color: #FFFFFF;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .FancyBorderBtn_center_title': `
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 48px;
        line-height: 70px;
        text-align: center;
        letter-spacing: -0.04em;
        color: #FFFFFF;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
    },
    large: {
      position: 'relative',
      height: 350,
      width: 350,
      background: `url(${FancyborderLarge}) no-repeat center`,
      overflow: 'hidden',
    },
    large_active: {
      position: 'relative',
      height: 350,
      width: 350,
      background: `url(${FancyborderLargeActive}) no-repeat center`,
      overflow: 'hidden',
    },
    normal: {
      position: 'relative',
      height: 300,
      width: 300,
      background: `url(${FancyborderNormal}) no-repeat center`,
      overflow: 'hidden',
    },
    normal_active: {
      position: 'relative',
      height: 300,
      width: 300,
      background: `url(${FancyborderNormalActive}) no-repeat center`,
      overflow: 'hidden',
    },
    small: {
      position: 'relative',
      height: 256.61,
      width: 256.61,
      background: `url(${FancyborderSmall}) no-repeat center`,
      overflow: 'hidden',
    },
    small_active: {
      position: 'relative',
      height: 256.61,
      width: 256.61,
      background: `url(${FancyborderSmallActive}) no-repeat center`,
      overflow: 'hidden',
    },
    xsmall: {
      position: 'relative',
      height: 191.06,
      width: 191.06,
      background: `url(${FancyborderXSmall}) no-repeat center`,
      overflow: 'hidden',
    },
    xsmall_active: {
      position: 'relative',
      height: 191.06,
      width: 191.06,
      background: `url(${FancyborderXSmallActive}) no-repeat center`,
      overflow: 'hidden',
    },
    icon: {
      maxWidth: '80%',
      maxHeight: '80%',
    },
    smallIcon: {
      width: 128.31,
      height: 128.31,
    },
    xsmallIcon: {
      width: 90,
      height: 90,
    },
    normalIcon: {
      width: 154.29,
      height: 154.29,
    },
    largeIcon: {
      width: 180,
      height: 180,
    },
    progress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      opacity: 0.7,
      zIndex: 1000,
    },
  })
);

const styles = (theme) => ({
  progressSymbol: {
    visibility: 'hidden',
  },
});

class BtnProgess extends React.Component {
  render() {
    const { percent, classes, width, strokeWidth } = this.props;
    return (
      <Progress
        type="circle"
        percent={percent}
        symbolClassName={classes.progressSymbol}
        status="default"
        width={width || 170}
        strokeWidth={strokeWidth || 10}
        theme={{
          default: {
            trailColor: `rgba(0,0,0,0.7)`,
            color: `rgba(255,255,255)`,
          },
        }}
      />
    );
  }
}
const AnimatedBtnProgess = animated(withStyles(styles)(BtnProgess));

interface FancyBorderBtnProps {
  style?: CSSProperties;
  onTap?: Function;
  className?: string;
  size: 'small' | 'normal' | 'large' | 'xs';
  icon?: any;
  title?: string;
  defaultActive?: boolean;
  type?: string[];
  iconStyle?: CSSProperties;
  disable?: boolean;
  centerTitle?: string;
  gestureGuide?: boolean;
}

const FancyBorderBtn: React.FC<FancyBorderBtnProps> = ({
  style,
  onTap,
  className,
  size,
  icon,
  title,
  defaultActive,
  type,
  iconStyle,
  disable,
  centerTitle,
  gestureGuide = true,
}) => {
  const classes = useStyles();
  const cn = classNames(classes.wrapper, className);

  const [active, setActive] = useState(false);

  React.useEffect(() => {
    setActive(defaultActive || false);
  }, [defaultActive]);

  const onHover = (isHover: boolean) => {
    setActive(defaultActive || isHover);
  };

  const props = useSpring({
    config: { duration: 1300 },
    percent: active ? 100 : 0,
    from: { percent: 0 },
    reset: true,
  });

  const btnClasses = useMemo(() => {
    switch (size) {
      case 'normal':
        return active ? classes.normal_active : classes.normal;
      case 'small':
        return active ? classes.small_active : classes.small;
      case 'xs':
        return active ? classes.xsmall_active : classes.xsmall;
      case 'large':
        return active ? classes.large_active : classes.large;
      default:
        return active ? classes.large_active : classes.large;
    }
  }, [active, size]);

  return (
    <>
      <ImgBtn
        style={disable ? { ...style, opacity: 0.5 } : style}
        onTap={disable ? () => {} : onTap}
        onHover={disable ? () => {} : onHover}
        className={cn}
        type={type}
      >
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={btnClasses}
          >
            {active && (
              <Box className={classes.progress}>
                {size == 'xs' ? (
                  <AnimatedBtnProgess
                    percent={props.percent}
                    width={120}
                    strokeWidth={10}
                  />
                ) : (
                  <AnimatedBtnProgess percent={props.percent} />
                )}
              </Box>
            )}
            {icon && (
              <img className={classes.icon} src={icon} style={iconStyle} />
            )}
            {centerTitle && (
              <Typography
                className={'FancyBorderBtn_center_title'}
              >
                {centerTitle}
              </Typography>
            )}
          </Grid>
          {title && (
            <Typography
              style={{ marginTop: 5 }}
              className="FancyBorderBtn_title"
            >
              {title}
            </Typography>
          )}
          {gestureGuide && (
            <Grid>
              {type && (
                <img
                  src={
                    type?.includes('L1')
                      ? TopLeft
                      : type?.includes('R1')
                      ? TopRight
                      : type?.includes('L2')
                      ? DownLeft
                      : DownRight
                  }
                  className={
                    size == 'normal'
                      ? classes.normalIcon
                      : size == 'small'
                      ? classes.smallIcon
                      : size == 'xs'
                      ? classes.xsmallIcon
                      : classes.largeIcon
                  }
                />
              )}
            </Grid>
          )}
        </Grid>
      </ImgBtn>
    </>
  );
};

export default FancyBorderBtn;

export { FancyBorderBtn };
