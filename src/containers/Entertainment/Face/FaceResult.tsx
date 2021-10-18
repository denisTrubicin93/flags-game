import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Grid, Typography, Dialog } from '@material-ui/core';
import { base64toFile } from '../../../service/Base64Utils';
import axios from 'axios';
import FancyBorderBox from '../../../components/common/FancyBorderBox';
import Loading from '../../../components/common/Loading';
import Face from './assets/face.svg';
import Eyebrow from './assets/eyebrow.svg';
import Eye from './assets/eye.svg';
import Mouth from './assets/mouth.svg';
import Nose from './assets/nose.svg';
import { addContent } from '../../../service/DigitalAvatarService';
import { DeviceService } from '../../../service/DeviceService';
import { BACKGROUND, CARD, CARD_SHADOW, ICON_TEXT_BUTTON } from '../../common/styles';
import BackIcon from '../assets/Common/back.png';
import PhoneIcon from '../assets/Common/phone.png';
import useFootControl from '../../../components/common/hook/useFootControl';

const useStyles = makeStyles(() =>
  createStyles({
    app_content: {
      width: '1080px',
      height: '1920px',
      top: 0,
      left: 0,
      position: 'fixed',
      '& .background': {
        ...BACKGROUND,
        '& .result_title': {
          fontSize: 70,
          fontWeight: 800,
          color: '#613BFF',
          position: 'absolute',
          top: 80,
        },
        '& .card': {
          ...CARD,
          position: 'absolute',
          top: 200,
          padding: 0,
          height: 1080,
          background: 'linear-gradient(90deg, #613BFF 0%, #3B76FF 100%);',
          '& .card_header': {
            width: '100%',
            height: 320,
            background: 'rgba(255, 255, 255, 0.2)',
            '& .result_type': {
              fontSize: 70,
              fontWeight: 800,
            },
            '& .result_content': {
              width: '65%',
            },
          },
          '& .card_body': {
            width: '100%',
            height: 760,
            overflow: 'hidden',
            padding: '40px',
            boxSizing: 'border-box',
            textAlign: 'justify',
            '& .content_message': {
              fontSize: 36,
              marginBottom: 30,
              fontWeight: 'bold',
            },
            '& .content_score': {
              fontSize: 144,
              fontWeight: 800,
              position: 'absolute',
              top: 850,
              left: 290,
            },
          },
        },
        '& .card_shadow': {
          ...CARD_SHADOW,
          background: 'rgba(97, 59, 255, 0.2)',
          opacity: 1,
          top: 1250,
        },
        '& .btn': {
          ...ICON_TEXT_BUTTON,
          '& .center_title': {
            fontSize: 48,
            color: '#333333',
            fontWeight: 800,
            marginTop: 20
          },
          '& .icon': {
            maxHeight: '45%',
            maxWidth: '45%',
          },
        },
        '& .btn_active': {
          border: '16px solid #613BFF',
        },
      },
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

const types: any = {
  face: {
    title: '顔',
    icon: Face,
  },
  eyebrows: {
    title: '眉毛',
    icon: Eyebrow,
  },
  eyes: {
    title: '目',
    icon: Eye,
  },
  nose: {
    title: '鼻',
    icon: Nose,
  },
  mouth: {
    title: '口',
    icon: Mouth,
  },
};

const defaultResult = [
  {
    region: 'face',
    type: '瓜顔',
    max_prob: '94%',
    analysis:
      '瓜実顔を持つ人はほとんど完璧主義者で清潔に厳しいです。自分に対しては厳しいですが、他人に対しては優しいです。並外れな社交能力を持ちます。',
  },
  {
    region: 'eyebrows',
    type: '八字眉',
    max_prob: '94%',
    analysis:
      '親しみにくい外見をしていますが，実際は気立てがよくて性格が良い。お金にケチらないため，一生働いていくことが多い。八字眉の人は心が広くて英雄のような気質を持ち，相談しやすいタイプです。',
  },
  {
    region: 'eyes',
    type: 'たれ目',
    max_prob: '94%',
    analysis:
      'この目を持つ男性は一般的に 自己主張が苦手で心が弱い傾向が見られます。また、妻の言うことをよく聞く男性が多いです。この目を持つ女性は、細心で優しく、柔順で気立てが良いのです。男性の庇護欲が誘えるタイプです。',
  },
  {
    region: 'nose',
    type: '朝天鼻',
    max_prob: '94%',
    analysis:
      'ホークの鼻を持っている人は自信があります。あなたはそのような格好良い鼻に恵まれています、それはあなたのスタイリストになります。もちろん、魅力的な鼻の表情があります。',
  },
  {
    region: 'mouth',
    type: '厚唇',
    max_prob: '94%',
    analysis:
      '情熱的で優しくて感覚刺激の方を重視します。仕事に関しては苦労をいとわず,恨み言を言われても気にかけません。ずる賢いことはしません。',
  },
];

const FaceAnalysisUrl = `${process.env.API_BASE_URL}/mirror/PhysiognomyAnalysis`;

const FaceResult = (props: any) => {
  const classes = useStyles();
  const history = useHistory();
  const photo = props.location.state.photo;
  const file = base64toFile(photo, 'face');

  const [result, setResult] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const data = new FormData();
    data.append('image', file, file.name);
    // now upload
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 8000,
    };
    axios.post(FaceAnalysisUrl, data, config).then(
      (response) => {
        console.log(response.data);
        setResult(response.data);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setResult(defaultResult);
        setLoading(false);
      }
    );
  }, []);

  const [contentIndex, setContentIndex] = React.useState(0);
  const [seconds, setSeconds] = React.useState(10);

  const tick = () => {
    if(seconds === 1) {
      setContentIndex((index) => ++index % 5)
      setSeconds(10)
    } else {
      setSeconds(seconds - 1)
    }
  }

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const showErrorAwhile = (onNext: any) => {
    setError(true);
    setTimeout(() => {
      setError(false);
      onNext();
    }, 3000);
  };

  const content = {
    points: 20,
    mirrorID: DeviceService.default().deviceId(),
    contentID: 'face',
    coins: 20,
    content: JSON.stringify(result),
  };

  const handleSaveClick = () => {
    setLoading(true);
    addContent(content)
      .then(function (response: any) {
        console.log('response.data: ', response.data);
        history.push({
          pathname: '/faceQRCodeScan',
          state: { recordId: response.data.recordId },
        });
      })
      .catch(function (error: any) {
        console.log(error);
        setLoading(false);
        showErrorAwhile(() => history.push('faceQRCodeScan'));
        setErrorMsg('Save content error:(');
      });
  };

  const contentMessageRenderer = () => {
    let messages = [];
    if (result.length > 0) {
      messages = (result[contentIndex]['analysis'] as string).split('。');

      messages.pop();
      return messages.length > 0
        ? messages.map((x, index) => (
            <Typography className="content_message" key={index}>
              {x}。
            </Typography>
          ))
        : '';
    }

    return '';
  };

  const buttons: any[] = [
    {
      centerTitle: 'さいしょにもどる',
      icon: BackIcon,
      onTap: () => history.push('menu'),
    },
    {
      centerTitle: 'けいたいへ送る',
      icon: PhoneIcon,
      onTap: handleSaveClick,
    },
  ];

  const { currentIndex, onTap, onHover } = useFootControl({
    intitialIndex: 0,
    actions: buttons.map((x: any) => x.onTap as Function),
    goBack: () => history.push('menu'),
  });

  const buttonClasses = (index: number) => {
    return currentIndex === index ? 'btn btn_active' : 'btn';
  };

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background">
          <Typography className="result_title">顔占い結果</Typography>
          <Grid container direction="column" className="card">
            <Grid
              item
              container
              direction="column"
              alignItems="center"
              justify="center"
              className="card_header"
            >
              <Typography className="result_type">
                顔:「{result.length > 0 && result[contentIndex]['type']}」
              </Typography>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="space-evenly"
                className="result_content"
              >
                {result.length > 0 &&
                  result.map((type: any, index: any) => (
                    <Grid key={index} item>
                      <FancyBorderBox
                        icon={types[type.region].icon}
                        defaultActive={index == contentIndex}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Box className="card_body">
              {contentMessageRenderer()}
              <Typography className="content_score">
                {result.length > 0 &&
                  `${Number(
                    result[contentIndex]['max_prob'].replace('%', '')
                  ).toFixed(0)}点`}
              </Typography>
            </Box>
          </Grid>
          <Box className="card_shadow" />
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{ width: 900, position: 'absolute', top: 1400 }}
          >
            {buttons.map((x, index) => (
              <Box
                className={buttonClasses(index)}
                key={index}
                onClick={() => onTap(index)}
                onMouseOver={() => onHover(index)}
              >
                <img src={x.icon} className="icon" />
                <Typography className="center_title">
                  {x.centerTitle}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Box>
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

export default FaceResult;

export { FaceResult };
