import React, { memo } from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import BottomNav from '../../components/common/BottomNav';

interface StyleProps {
  headerPic: string;
  qrCode: string;
  scanMe: string;
}

const useStyles = makeStyles({
  panel: {
    margin: '0 24px',
    padding: '0 48px',
    border: '1px solid #fff',
    borderRadius: 48,
    height: 1269,
    textAlign: 'left',
    position: 'relative',
    boxSizing: 'border-box',
  },
  background: {
    borderRadius: '48px 28px 0 0',
    position: 'absolute',
    height: 184,
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: '#fff',
    backgroundImage: ({ headerPic }: StyleProps) => `url(${headerPic})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  },
  filter: {
    borderRadius: 48,
    position: 'absolute',
    height: 1019,
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 2,
    background:
      'linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%) no-repeat',
  },
  info: {
    position: 'absolute',
    width: 'calc(100% - 96px)',
    bottom: 48,
    zIndex: 3,
  },
  title: {
    marginBottom: '16px',
    fontFamily: 'Noto Sans JP',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '40px',
    lineHeight: '110%',
    color: '#fff',
  },
  description: {
    fontFamily: 'Noto Sans JP',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '40px',
    lineHeight: '110%',
    color: '#fff',
  },
  qrCodeDescription: {
    marginTop: '77px',
    fontFamily: 'Noto Sans JP',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '32px',
    lineHeight: '130%',
    color: '#fff',
  },
  qrCode: {
    // marginTop: '45px',
    width: '130px',
    height: '130px',
    backgroundImage: ({ qrCode }: StyleProps) => `url(${qrCode})`,
    backgroundRepeat: 'round',
    float: 'right',
  },
  scanMe: {
    margin: '135px -130px 0px 0px',
    width: '130px',
    height: '33.5px',
    backgroundImage: ({ scanMe }: StyleProps) => `url(${scanMe})`,
    backgroundRepeat: 'round',
    float: 'right',
  },
  divider: {
    marginTop: '30px',
    marginBottom: '24px',
    backgroundColor: '#fff',
  },
});

type FitnessCardProps = {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  headerPic: string;
  plan: string;
  monthlyPremium: string;
  service: string;
  description: string;
  qrCode: string;
  scanMe: string
};

function FitnessCard({
  headerPic,
  plan,
  monthlyPremium,
  service,
  description,
  qrCode,
  scanMe,
  onClick,
}: FitnessCardProps) {
  const classes = useStyles({ headerPic, qrCode, scanMe });
  return (
    <div>
      <div className={classes.panel} onClick={onClick}>
        <div className={classes.background} />
        <div className={classes.filter} />
        <div className={classes.info}>
          <div className={classes.title}>プラン</div>
          <div className={classes.description}>{plan}</div>
          <Divider className={classes.divider} />
          <div className={classes.title}>月払保険料</div>
          <div className={classes.description}>{monthlyPremium}</div>
          <Divider className={classes.divider} />
          <div className={classes.title}>サービス</div>
          <div className={classes.description}>{service}</div>
          <Divider className={classes.divider} />
          <div className={classes.title} style={{ lineHeight: '130%' }}>
            説明
          </div>
          <div className={classes.description}>{description}</div>
          <Divider className={classes.divider} />
          <div className={classes.qrCode} />
          <div className={classes.scanMe} />
          <div className={classes.qrCodeDescription}>
            QRコードをスキャンして
            <br />
            詳しいパンフレットを請求（無料）
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(FitnessCard);
