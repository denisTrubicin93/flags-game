import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';

const Running = () => {
  const unityContent = new UnityContent(
    '../assets/unity/Running/SubwayPOC.json',
    '../assets/unity/UnityLoader.js'
  );
  // subway-webgl
  return (
    // <div id="unityContainer" style={{width: "720px", height: "1260px", margin: "auto"}}>
    //   <Unity unityContent={unityContent}/>
    // </div>
    <div
      id="unityContainer"
      style={{ width: '760px', height: '800px', margin: 'auto' }}
    >
      <Unity unityContent={unityContent} />;
    </div>
  );
};
export default Running;
export { Running };
