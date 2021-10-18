import React from 'react';
import { Box } from '@material-ui/core';
import GestureClickPng from './assets/GestureClick.png';

interface GestureClickProps {
  className?: string;
  style?: any;
}

// eslint-disable-next-line react/display-name
const GestureClick = React.forwardRef<HTMLDivElement, GestureClickProps>(
  ({ className, style }, ref) => {
    return (
      <Box
        ref={ref}
        className={className}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          width: '175px',
          height: '102px',
          background: `url(${GestureClickPng}) no-repeat center`,
          ...style,
        }}
      />
    );
  }
);

export default GestureClick;
export { GestureClick };
