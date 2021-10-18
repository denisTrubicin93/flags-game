import React, { memo, ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNav from './BottomNav';

interface StyleProps {
  bg: string;
}

const useStyles = makeStyles({
  panel: {
    margin: '0 24px',
    padding: 48,
    border: '1px solid #fff',
    borderRadius: 48,
    height: 1527,
    textAlign: 'left',
    position: 'relative',
    boxSizing: 'border-box',
  },
  background: {
    borderRadius: 48,
    position: 'absolute',
    height: 1018,
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 1,
    background: ({ bg }: StyleProps) => `url(${bg}) no-repeat`,
    backgroundSize: 'cover',
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
      'linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 50%) no-repeat',
  },
  info: {
    position: 'absolute',
    width: 'calc(100% - 96px)',
    bottom: 64,
    zIndex: 3,
  },
});

type CarouselCardProps = {
  bg: string;
  children: NonNullable<ReactNode>;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  bottomNav: string;
  first?: boolean;
  last?: boolean;
};

function CarouselCard({ onClick, children, bg, bottomNav }: CarouselCardProps) {
  const classes = useStyles({ bg });
  return (
    <div>
      <div className={classes.panel} onClick={onClick}>
        <div className={classes.background} />
        <div className={classes.filter} />
        <div className={classes.info}>{children}</div>
      </div>
      <BottomNav onClick={onClick}>{bottomNav}</BottomNav>
    </div>
  );
}
export default memo(CarouselCard);
