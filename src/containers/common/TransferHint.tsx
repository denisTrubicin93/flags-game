import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Typography, Grid, Dialog } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { FancyBorderBtn } from '../../components/common/button';
import Loading from '../../components/common/Loading';
import { addContent } from '../../service/DigitalAvatarService';

const useStyles = makeStyles(() =>
  createStyles({
    app_header: {
      '& .background': `
        position: absolute;
        width: 1080px;
        height: 1920px;
        left: 0px;
        background: radial-gradient(50% 50% at 50% 50%, #2C2F37 0%, #000000 100%);
        opacity: 0.7;
        border-radius: 70px;
      `,
      '& .btn_box': `
        position: absolute;
        width: 1080px;
        top: 350px;
      `,
      '& .content_text': `
        position: absolute;
        width: 692px;
        height: 232px;
        left: 194px;
        top: 930px;

        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 80px;
        line-height: 116px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: -0.04em;

        color: #FFFFFF;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .content_grid': `
        position: absolute;
        top: 930px;
      `,
      '& .content_grid p': `
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 80px;
        line-height: 116px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: -0.04em;

        color: #FFFFFF;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    `,

    },
    error_msg: `
      font-family: Noto Sans JP;
      font-style: normal;
      font-weight: bold;
      font-size: 45px;
      line-height: 50px;
      text-align: center;
      color: #FFFFFF;
    `,
  })
);

interface TransferHintProps {
  title: string;
  titleList?: string[];
  yesIcon: any;
  yesTitle: string;
  onYesTap: Function;
  noIcon: any;
  noTitle: string;
  onNoTap: Function;
  content: any;
}

const TransferHint = (props: TransferHintProps) => {
  const {
    title,
    titleList,
    yesIcon,
    yesTitle,
    onYesTap,
    noIcon,
    noTitle,
    onNoTap,
    content,
  } = props;
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const showErrorAwhile = (onNext) => {
    setError(true);
    setTimeout(() => {
      setError(false);
      onNext();
    }, 3000);
  };

  const handleSaveClick = () => {
    setLoading(true);
    addContent(content)
      .then(function (response) {
        console.log('response.data: ', response.data);
        onYesTap(response.data.recordId);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        showErrorAwhile(onYesTap);
        setErrorMsg('Save content error:(');
      });
  };

  return (
    <>
      <Box className={classes.app_header}>
        <Box className="background" />
        <Grid
          container
          className="btn_box"
          justify="space-evenly"
          alignItems="center"
        >
          <FancyBorderBtn
            size="normal"
            onTap={onNoTap}
            icon={noIcon}
            title={noTitle}
            type={['L1', 'L2']}
          />
          <FancyBorderBtn
            size="normal"
            onTap={handleSaveClick}
            icon={yesIcon}
            title={yesTitle}
            type={['R1', 'R2']}
          />
        </Grid>
        {titleList &&
          <Grid container direction="column" alignItems="center" className="content_grid">
            {titleList.map((m, index) => (
              <Typography key={index}>{m}</Typography>
            ))}
          </Grid>
        }
        {!titleList &&
          <Typography className="content_text">{title}</Typography>
        }

      </Box>
      <Dialog fullScreen open={loading}>
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <Loading color="white" height={200} width={200} />
        </Grid>
      </Dialog>
      <Dialog fullScreen open={error}>
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography className={classes.error_msg}>{errorMsg}</Typography>
        </Grid>
      </Dialog>
    </>
  );
};

export default TransferHint;

export { TransferHint };
