import React, { CSSProperties, useRef } from 'react';
import { TapBtn } from './TapBtn';

interface ImgBtnProps {
  style?: CSSProperties;
  onTap?: Function;
  onHover?: Function;
  color?: 'primary' | 'secondary';
  className?: string;
  isBack?: boolean;
  type?: string[];
}

const ImgBtn: React.FC<ImgBtnProps> = ({ style, onTap, onHover, className, children, isBack, type }) => {
  return (
    <TapBtn style={style} onTap={onTap} onHover={onHover} className={className} isBack={isBack} type={type}>
      {children}
    </TapBtn>
  );
}

export default ImgBtn;

export {
  ImgBtn
}
