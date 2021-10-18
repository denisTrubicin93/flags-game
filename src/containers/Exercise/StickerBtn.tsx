import React, { CSSProperties, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { TextTapBtn } from '../../components/common/button/TextTapBtn';

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
  primary: {
    position: 'relative',
    width: '490px',
    height: '106px',
    background: 'linear-gradient(101.84deg, #18E75E 2.79%, #55EF8C 98.95%)',
    borderRadius: '80px',
    '&:after': after,
  },
  secondary: {
    position: 'relative',
    width: '490px',
    height: '106px',
    background: 'linear-gradient(101.84deg, #3297B8 2.79%, #17576F 98.95%)',
    borderRadius: '80px',
    '&:after': after,
  },
  activePrimary: {
    position: 'relative',
    width: '490px',
    height: '106px',
    background: 'linear-gradient(101.84deg, #18E75E 2.79%, #55EF8C 98.95%)',
    borderRadius: '80px',
    '&:after': activeAfter,
  },
  activeSecondary: {
    position: 'relative',
    width: '490px',
    height: '106px',
    background: 'linear-gradient(101.84deg, #3297B8 2.79%, #17576F 98.95%)',
    borderRadius: '80px',
    '&:after': activeAfter,
  },
});

interface MenuBtnProps {
  style?: CSSProperties;
  textStyle?: CSSProperties;
  onTap?: any;
  label: string;
  color?: 'primary' | 'secondary';
  className?: string;
  hover?: boolean;
  type?: string[];
}

const MenuBtn: React.FC<MenuBtnProps> = ({ style, textStyle, onTap, label, color, className, hover, type }) => {
  const classes = useStyles();

  const [active, setActive] = useState(false);

  const onHover = (isHover: boolean) => {
    setActive(isHover);
  };

  const colorClass = (color === 'primary' ? classes.primary : classes.secondary);
  const normalClassName = classNames(colorClass, className);

  const activeColorClass = (color === 'primary' ? classes.activePrimary : classes.activeSecondary);
  const activeClassName = classNames(activeColorClass, className);

  return (
    <TextTapBtn
      style={style}
      textStyle={textStyle}
      onTap={onTap}
      onHover={onHover}
      className={hover && active ? activeClassName : normalClassName}
      label={label}
      type={type}
    />
  );
}

MenuBtn.defaultProps = {
  color: 'primary',
  hover: true,
};

export default MenuBtn;

export { MenuBtn };
