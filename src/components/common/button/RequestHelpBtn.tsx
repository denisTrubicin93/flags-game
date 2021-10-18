import React, { CSSProperties, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { ImgBtn } from './ImgBtn';
import RequestHelp from './assets/Request_Help.inline.svg';
import { DeviceService } from '../../../service/DeviceService';

const useStyles = makeStyles({
  normal: {
    '& stop:nth-child(1)': `
      stop-color: white;
    `,
    '& stop:nth-child(2)': `
      stop-color: #A8A8A8;
    `,
  },
  active: {
    '& stop': `
      stop-color: #42DC76;
    `,
  },
});
interface RequestHelpBtnProps {
  style?: CSSProperties;
  onTap?: Function;
  className?: string;
}

const RequestHelpBtn: React.FC<RequestHelpBtnProps> = ({ style, onTap, className }) => {
  const classes = useStyles();

  const [active, setActive] = useState(false);

  const onHover = (isHover: boolean) => {
    setActive(isHover);
  };

  const normalClassName = classNames(classes.normal, className);
  const activeClassName = classNames(classes.active, className);

  const callStaff = () => {
    DeviceService.default().callStaff();
  }
  return (
    <ImgBtn
      style={style}
      onTap={callStaff}
      onHover={onHover}
      className={active ? activeClassName : normalClassName}
    >
      <RequestHelp />
    </ImgBtn>
  );
};

export default RequestHelpBtn;

export {
  RequestHelpBtn
}
