import React from 'react';
import ReactPlayer from 'react-player';

export default function youtube() {

  return (
    <div style={{ width: '968px' }}>
      <ReactPlayer
        url="https://youtu.be/VTQtWj702Sc?list=PLTIqUVQRjA315-tvGM3DxDJkOI2E-2-nk"
        playing
        loop
        muted
        width="968px"
        height="577px"
      />
    </div>
  );
}
