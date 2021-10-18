import SpeechProcessorService from './SpeechProcessorService';
import { SpeechRecognitionService } from './SpeechRecognitionService';

export default class SpeechController {
  private static instance: SpeechController;

  private speechProcSrv: SpeechProcessorService = new SpeechProcessorService();

  readonly speechRecogSrv: SpeechRecognitionService = new SpeechRecognitionService();

  private isRecog = false;

  public static default(): SpeechController {
    if (!SpeechController.instance) {
      SpeechController.instance = new SpeechController();
    }

    return SpeechController.instance;
  }

  constructor() {
    this.speechProcSrv.startSubject.subscribe(() => {
      if (this.isRecog) {
        this.speechRecogSrv.abort();
      }
    });
    this.speechProcSrv.endSubject.subscribe(() => {
      if (this.isRecog) {
        this.speechRecogSrv.start();
      }
    });
  }

  startRecognition(): SpeechRecognitionService {
    this.isRecog = true;
    this.speechRecogSrv.start();
    return this.speechRecogSrv;
  }

  stopRecognition() {
    this.isRecog = false;
    this.speechRecogSrv.stop();
  }

  textToSpeech(text: string) {
    this.speechProcSrv.say(text);
  }
}
