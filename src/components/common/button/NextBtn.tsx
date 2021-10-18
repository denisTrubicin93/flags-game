import React, { CSSProperties, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { ImgBtn } from './ImgBtn';
import Next from './assets/Next.inline.svg';

const useStyles = makeStyles({
  normal: {
    '& path': `
      fill: white;
    `,
  },
  active: {
    '& path': `
      fill: #42DC76;
    `,
  },
});
interface NextBtnProps {
  style?: CSSProperties;
  onTap?: Function;
  className?: string;
}

const NextBtn: React.FC<NextBtnProps> = ({ style, onTap, className }) => {
  const classes = useStyles();

  const [active, setActive] = useState(false);

  const onHover = (isHover: boolean) => {
    setActive(isHover);
  };

  const normalClassName = classNames(classes.normal, className);
  const activeClassName = classNames(classes.active, className);

  return (
    <ImgBtn
      style={style}
      onTap={onTap}
      onHover={onHover}
      className={active ? activeClassName : normalClassName}
    >
      <Next />
    </ImgBtn>
  );
};

export default NextBtn;

export {
  NextBtn
}
