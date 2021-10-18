import React from 'react';

interface LoadingProps {
  color?: string;
  height?: number;
  width?: number;
}

export default function Loading(props: LoadingProps) {
  return (
    <div
      style={{
        ...{ fill: 'rgb(255, 255, 255)', height: 100, width: 100 },
        fill: props.color,
        height: props.height,
        width: props.width,
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <circle transform="translate(8 0)" cx="0" cy="16" r="0">
          <animate
            attributeName="r"
            values="0; 4; 0; 0"
            dur="1.2s"
            repeatCount="indefinite"
            begin="0"
            keyTimes="0;0.2;0.7;1"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
            calcMode="spline"
          ></animate>
        </circle>
        <circle transform="translate(16 0)" cx="0" cy="16" r="0">
          <animate
            attributeName="r"
            values="0; 4; 0; 0"
            dur="1.2s"
            repeatCount="indefinite"
            begin="0.3"
            keyTimes="0;0.2;0.7;1"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
            calcMode="spline"
          ></animate>
        </circle>
        <circle transform="translate(24 0)" cx="0" cy="16" r="0">
          <animate
            attributeName="r"
            values="0; 4; 0; 0"
            dur="1.2s"
            repeatCount="indefinite"
            begin="0.6"
            keyTimes="0;0.2;0.7;1"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
            calcMode="spline"
          ></animate>
        </circle>
      </svg>
    </div>
  );
}
