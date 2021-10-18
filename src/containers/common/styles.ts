import CountDownBG from '../Entertainment/assets/Common/countdown_bg.png';

export const BACKGROUND = {
  position: 'absolute',
  width: 1080,
  height: 1920,
  left: 0,
  background: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

export const TOP_BG = {
  width: 1080,
  height: 480,
};

export const BOTTOM_BG = {
  width: 1080,
  height: 1440,
  background: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const BLUR_TITLE = {
  fontWeight: 800,
  fontSize: 132,
  letterSpacing: '-0.04em',
  color: '#333333',
  opacity: 0.1,
  marginTop: 40,
};

export const CARD = {
  width: 920,
  height: 560,
  borderRadius: 32,
  padding: 20,
  position: 'relative',
  top: -70,
};

export const CARD_SHADOW = {
  width: 860,
  height: 50,
  background: '#2479F9',
  borderRadius: 32,
  opacity: 0.2,
  position: 'relative',
  top: -95,
};

export const COUNTER = {
  width: 360,
  height: 360,
  background: `center no-repeat url(${CountDownBG})`,
  border: '16px solid #FFFFFF',
  borderRadius: '50%',
  boxShadow: '0px 0px 48px rgba(97, 59, 255, 0.15)',
};

export const COUNTER_NOTE = {
  width: 400,
  height: 80,
  borderRadius: 40,
  background: '#613BFF19',
  color: '#613BFF',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 40,
  fontWeight: 800,
  letterSpacing: '-0.04em',
  marginTop: 30,
};

export const ICON_TEXT_BUTTON = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: 440,
  height: 360,
  background: '#ffffff',
  borderRadius: 50,
  overflow: 'hidden',
  border: '16px solid #FFFFFF',
  boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.25)',
  boxSizing: 'border-box',
};
