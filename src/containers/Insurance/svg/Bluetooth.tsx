import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

export default function Bluetooth(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props} style={{width:24, height: 24, fill: 'none', ...props.style}}>
      <path d="M11.25 3.00031L17.25 7.50031L11.25 12.0003V3.00031Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.25 12.0003L17.25 16.5003L11.25 21.0003V12.0003Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.25 7.50024L11.25 12.0002" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.25 16.5002L11.25 12.0002" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}
