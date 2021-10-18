import ky from 'ky';
import { DEFAULT_API_OPTIONS } from './config';

const getSpeech = async (
  transcript: string
): Promise<AudioBuffer> => {

  const params = {
    speackerId: '308',
    volume: 100,
    speed: 100,
    pitch: 100,
    textData: transcript,
  };

  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    json: params,
  };

  const response = await ky.post(`tts/text2voice`, mergedOptions);
  const data = await response.arrayBuffer();
  const audioCtx = new AudioContext();
  const audioBuffer = audioCtx.decodeAudioData(
    data,
    (decodedData: AudioBuffer | null) => {
      return decodedData;
    }
  );

  if (!data) {
    throw Error('API type error');
  }

  return audioBuffer;
};

export default getSpeech;
export {
  getSpeech
};
