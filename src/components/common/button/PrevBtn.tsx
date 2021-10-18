import React, { CSSProperties, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { ImgBtn } from './ImgBtn';
import Previous from './assets/Previous.inline.svg';

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
interface PrevBtnProps {
  style?: CSSProperties;
  onTap?: Function;
  className?: string;
}

const PrevBtn: React.FC<PrevBtnProps> = ({ style, onTap, className }) => {
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
      isBack={true}
    >
      <Previous />
    </ImgBtn>
  );
};

export default PrevBtn;

export {
  PrevBtn
}
