import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

export default function ArrowUp(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 45 20" {...props} style={{width: 45, height: 20, fill: 'none', ...props.style}} >
      <path d="M2.5 18L22.5 2L42.5 18" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}
