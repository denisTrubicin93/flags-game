import React from 'react';
import logo from './svg/aflac_logo.png';

export default function AflacLogo(props) {
  return <img id="aflac-logo" style={props.style} width={250} height={250} src={logo} alt="logo" />;
}
