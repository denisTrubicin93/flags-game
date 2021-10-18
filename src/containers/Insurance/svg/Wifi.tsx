import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

export default function Wifi(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props} style={{width:24, height: 24, fill: 'none', ...props.style}}>
      <path d="M11.9993 19.8752C12.6206 19.8752 13.1243 19.3716 13.1243 18.7502C13.1243 18.1289 12.6206 17.6252 11.9993 17.6252C11.3779 17.6252 10.8743 18.1289 10.8743 18.7502C10.8743 19.3716 11.3779 19.8752 11.9993 19.8752Z" fill="white"/>
      <path d="M8.71118 15.5683C9.59683 14.7223 10.7745 14.2502 11.9992 14.2502C13.224 14.2502 14.4016 14.7223 15.2873 15.5683" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.5293 12.3863C7.25896 10.6964 9.58115 9.75024 11.9993 9.75024C14.4175 9.75024 16.7397 10.6964 18.4694 12.3863" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.34973 9.2043C4.92236 6.6705 8.38837 5.25024 11.9993 5.25024C15.6102 5.25024 19.0762 6.6705 21.6488 9.2043" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}
