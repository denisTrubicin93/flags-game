import { Subject } from 'rxjs';
import * as Axios from 'axios';

export default class SpeechProcessorService {
  readonly startSubject = new Subject();

  readonly endSubject = new Subject();

  // constructor() {}

  say(transcript: string) {
    const params = {
      speackerId: '308',
      volume: 100,
      speed: 100,
      pitch: 100,
      textData: transcript,
    };
    this.startSubject.next();
    console.log('play start');
    // eslint-disable-next-line promise/catch-or-return
    Axios.default
      .create({
        responseType: 'arraybuffer',
      })
      .post(`${process.env.API_BASE_URL}/tts/text2voice`, params)
      // eslint-disable-next-line promise/always-return
      .then((response) => {
        const audioCtx = new AudioContext();
        audioCtx.decodeAudioData(
          response.data,
          (decodedData: AudioBuffer | null) => {
            if (decodedData) {
              const source = audioCtx.createBufferSource();
              source.buffer = decodedData;
              source.connect(audioCtx.destination);
              source.addEventListener('ended', () => {
                console.log('play end');
                this.endSubject.next();
              });
              source.start();
            } else {
              console.log('play error');
              this.endSubject.next();
            }
          }
        );
      });
  }
}
