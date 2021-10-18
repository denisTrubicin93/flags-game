import React, { CSSProperties, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { TapBtn } from './TapBtn';
import { Box } from '@material-ui/core';

interface HoverEffectBtnProps {
  style?: CSSProperties;
  onTap?: any;
  className?: string;
  radius?: number;
  selected?: boolean;
  hover?: boolean;
  type?: string[];
}

const HoverEffectBtn: React.FC<HoverEffectBtnProps> = ({ style, onTap, className, children, radius=100, hover, selected, type }) => {

  const classes = makeStyles({
    root: {
      '& .normal': {
        borderRadius: `${radius}px`,
        border: '10px solid rgba(255, 255, 255, 0.6)',
        boxSizing: 'border-box',
      },
      '& .active': {
        borderRadius: `${radius}px`,
        border: '10px solid #42DC76',
        boxSizing: 'border-box',
      },
    }
  })();
  const [active, setActive] = useState(selected);

  const onHover = (isHover: boolean) => {
    setActive(isHover);
  };

  const rootClassName = classNames(classes.root, className);


  return (
    <Box className={rootClassName}>
      <TapBtn
        style={style}
        onTap={hover ? onTap : undefined}
        onHover={hover ? onHover : undefined}
        className={active ? "active" : "normal" }
        type={type}
      >
      {children}
      </TapBtn>
    </Box>
  );
}

HoverEffectBtn.defaultProps = {
  hover: true,
};

export default HoverEffectBtn;

export { HoverEffectBtn };
