import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { RequestHelpBtn } from '../../components/common/button';
import MaskGroup from './assets/Common/MaskGroup.png';
import NGGroup from './assets/Quiz_Ready_NG/ngGroup.png';

const useStyles = makeStyles(() =>
  createStyles({
    app_content: {
      width: '1080px',
      height: '1920px',
      top: 0,
      left: 0,
      position: 'fixed',
      '& .background': `
        /* Background */

        position: absolute;
        width: 1080px;
        height: 1920px;
        left: 0px;

        background: radial-gradient(50% 50% at 50% 50%, #2C2F37 0%, #000000 100%);
        opacity: 0.7;
        border-radius: 70px;
      `,
      '& .request_help': `
        /* Request_Help */

        position: absolute;
        width: 400px;
        height: 114px;
        left: 647px;
        top: 44px;

        border-radius: 100px;
        display: none;
      `,
      '& .barcode_scan': `
        position: absolute;
        left: 8.8%;
        right: 8.33%;
        top: 21.98%;
        bottom: 6.3%;

        // background: linear-gradient(302.01deg, #250055 -6.72%, #5300FF 111.36%);
        background: url(${MaskGroup}) no-repeat center;
        border-radius: 20px;
      `,
      '& .barcode_scan .ngGroup': `
        /* ngGroup */

        position: absolute;
        width: 683px;
        height: 683px;
        top: 345px;
        left: calc(50% - 683px/2);

        background: url(${NGGroup}) no-repeat center;
      `,
    },
  })
);

const QuizReadyNG = () => {
  const classes = useStyles();
  const history = useHistory();
  React.useEffect(() => {
    const timeout = setTimeout(() => history.push('QuizReadyExplanation'), 1000);
    return () => {
      clearTimeout(timeout);
    };
  });
  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background" />
        <Box className="barcode_scan">
          <Box className="ngGroup" />
        </Box>
      </Box>
    </>
  );
};

export default QuizReadyNG;

export { QuizReadyNG };
