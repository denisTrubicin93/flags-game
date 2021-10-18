import React, { CSSProperties, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import { TapBtn } from './TapBtn';

const useStyles = makeStyles({
  label: `
    display: inline-block,
    position: absolute;
    margin: 0 auto;
    font-family: Noto Sans JP;
    font-style: normal;
    font-weight: bold;
    font-size: 50px;
    line-height: 110%;
    text-align: center;
    color: #FFFFFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  `,
});

interface TextTapBtnProps {
  style?: CSSProperties;
  textStyle?: CSSProperties;
  onTap?: Function;
  onHover?: Function;
  label: string;
  className?: string;
  type?: string[];
}

const TextTapBtn: React.FC<TextTapBtnProps> = ({ style, textStyle, onTap, onHover, label, className, type }) => {
  const classes = useStyles();
  return (
    <TapBtn style={style} onTap={onTap} onHover={onHover} className={className} type={type}>
      <Grid style={{width: '100%', height: '100%'}} container alignItems="center" justify="center">
        <Typography style={textStyle} className={classes.label}>{label}</Typography>
      </Grid>
    </TapBtn>
  );
}

export default TextTapBtn;

export { TextTapBtn };
