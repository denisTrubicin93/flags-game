import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import DefaultAvatar from './assets/default_avatar.png';
import avatarBg from './assets/avatar-bg.svg';

const useStyles = makeStyles({
  avatarContainer: {
    background: `no-repeat center/100% url(${avatarBg})`,
    zIndex: 1,
  },
  avatarImg: {
    maxWidth: '90%',
    maxHeight: '90%',
  },
  rightTagContainner: `
    margin-left: -6px;
    width: 178px;
    height: 48px;
    background: radial-gradient(50% 50% at 50% 50%, #8DFDB5 0%, #1ED760 100%);
    border-radius: 0px 60px 60px 0px;
  `,
  leftTagContainner: `
    margin-right: -6px;
    width: 118px;
    height: 48px;
    background: radial-gradient(50% 50% at 50% 50%, #8DFDB5 0%, #1ED760 100%);
    border-radius: 60px 0px 0px 60px;
  `,
  tagText: `
    font-family: Noto Sans JP;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 20px;
    text-align: center;
    color: #FFFFFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  `,
});

export interface AvatarProps {
  size: number;
  imgSrc: any;
  imgStyle?: React.CSSProperties;
}
function Avatar(props: AvatarProps) {
  const classes = useStyles();
  const { size, imgSrc, imgStyle } = props;
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ width: size, height: size }}
      className={classes.avatarContainer}
    >
      <img style={imgStyle} src={imgSrc} className={classes.avatarImg} />
    </Grid>
  );
}

export interface ProfileProps {
  right?: boolean;
  tagText?: string;
  avatar?: any;
  size: 'small' | 'normal' | 'large';
  score?: number;
}

// eslint-disable-next-line react/prop-types
const Profile: React.FC<ProfileProps> = ({ right, tagText, avatar, size, score }) => {
  const classes = useStyles();
  let sizeValue = 138;
  switch (size) {
    case 'small':
      sizeValue = 114;
      break;
    case 'normal':
      sizeValue = 138;
      break;
    case 'large':
      sizeValue = 221;
      break;
  }
  return (
    <>
      <Grid container alignItems="center">
        {!right && (
          <>
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.leftTagContainner}
            >
              <Typography className={classes.tagText}>{tagText}</Typography>
            </Grid>
            <Avatar size={sizeValue} imgSrc={avatar} />
          </>
        )}
        {right && (
          <>
            <Avatar
              size={sizeValue}
              imgSrc={avatar}
              imgStyle={{ borderRadius: '100%' }}
            />
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.rightTagContainner}
              style={score ? {width: (356*score)/91} : {}}
            >
              <Typography className={classes.tagText}>{tagText}</Typography>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

Profile.defaultProps = {
  tagText: '+10',
  avatar: DefaultAvatar,
};

export default Profile;

export { Profile };
