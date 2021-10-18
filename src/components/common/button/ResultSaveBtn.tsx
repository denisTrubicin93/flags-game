import React, { CSSProperties, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import classNames from 'classnames';
import SaveIcon from './assets/SaveIcon.svg';
import { ImgBtn } from './ImgBtn';

const after = `
  position: absolute;
  top: -10px;
  bottom: -10px;
  left: -10px;
  right: -10px;
  background: linear-gradient(180deg, #FFFFFF 0%, #A8A8A8 100%);
  content: '';
  z-index: -1;
  border-radius: 100px;
`;

const activeAfter = `
  position: absolute;
  top: -10px;
  bottom: -10px;
  left: -10px;
  right: -10px;
  background: linear-gradient(180deg, #42DC76 0%, #7DF7A9 100%);
  content: '';
  z-index: -1;
  border-radius: 100px;
`;

const useStyles = makeStyles({
  label: `
  display: inline-block,
  position: absolute;
  margin: 0 auto;
  font-family: Noto Sans JP;
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
  line-height: 110px;
  /* identical to box height, or 40% */

  text-align: center;

  /* Label / Dark / Primary */

  color: #FFFFFF;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
`,
  imgIcon: `
    position: absolute;
    width: 60px;
    height: 68.84px;
    left: 57px;
    top: 24px;
  `,
  primary: {
    position: 'relative',
    width: '558px',
    height: '116px',
    background: 'linear-gradient(101.84deg, #18E75E 2.79%, #55EF8C 98.95%)',
    borderRadius: '80px',
    '&:after': after,
  },
  secondary: {
    position: 'relative',
    width: '558px',
    height: '116px',
    background: 'linear-gradient(101.84deg, #3297B8 2.79%, #17576F 98.95%)',
    borderRadius: '80px',
    '&:after': after,
  },
  activePrimary: {
    position: 'relative',
    width: '558px',
    height: '116px',
    background: 'linear-gradient(101.84deg, #18E75E 2.79%, #55EF8C 98.95%)',
    borderRadius: '80px',
    '&:after': activeAfter,
  },
  activeSecondary: {
    position: 'relative',
    width: '558px',
    height: '116px',
    background: 'linear-gradient(101.84deg, #3297B8 2.79%, #17576F 98.95%)',
    borderRadius: '80px',
    '&:after': activeAfter,
  },
});

interface ResultSaveBtnProps {
  style?: CSSProperties;
  onTap?: any;
  label: string;
  color?: 'primary' | 'secondary';
  className?: string;
  hover?: boolean;
  type?: string[];
}

const ResultSaveBtn: React.FC<ResultSaveBtnProps> = ({
  style,
  onTap,
  label,
  color,
  className,
  type
}) => {
  const classes = useStyles();

  const [active, setActive] = useState(false);

  const onHover = (isHover: boolean) => {
    setActive(isHover);
  };

  const colorClass = color === 'primary' ? classes.primary : classes.secondary;
  const normalClassName = classNames(colorClass, className);

  const activeColorClass =
    color === 'primary' ? classes.activePrimary : classes.activeSecondary;
  const activeClassName = classNames(activeColorClass, className);

  return (
    <ImgBtn
      style={style}
      onTap={onTap}
      onHover={onHover}
      className={active ? activeClassName : normalClassName}
      type={type}
    >
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={2}>
          <img src={SaveIcon} className={classes.imgIcon} />
        </Grid>
        <Grid item xs={10}>
          <Typography className={classes.label}>{label}</Typography>
        </Grid>
      </Grid>
    </ImgBtn>
  );
};

ResultSaveBtn.defaultProps = {
  color: 'primary',
  hover: true,
};

export default ResultSaveBtn;

export { ResultSaveBtn };
