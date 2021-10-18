import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

export default function ArrowDown(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 35 10" {...props} style={{width: 35, height: 10, fill: 'none', ...props.style}}>
      <path d="M1.5 1L17.5 9L33.5 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}
