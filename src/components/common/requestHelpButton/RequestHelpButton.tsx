import React from 'react';
import { createStyles, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
          width:"357px",
          height:"88px",
          backgroundColor:"#000000",
          // background: "linear-gradient(to bottom, blue, red)",
          borderRadius:"100px",
          border: "10px solid #FFFFFF",
          // borderWidth:"10px",
          // borderColor:"",
        },
        labelStyle: {
          font:"Noto Sans JP",
          fontWeight:"bolder",
          fontStyle:"normal",
          fontSize:"40px",
          lineHeight:"20px",
          color:"#FFFFFF"
        }
    }),
);
interface RequestHelpButtonProps {
  labelStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  value: string
}

const RequestHelpButton = ({ ...props }: RequestHelpButtonProps) => {
    const classes = useStyles();
    return (
        <div>
          <button className={classes.root} style={props.buttonStyle}>
            <label className={classes.labelStyle} style={props.labelStyle}>{props.value}</label>
          </button>
        </div>
    );
}
export default RequestHelpButton;

