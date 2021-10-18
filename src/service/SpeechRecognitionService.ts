import { Subject } from "rxjs";

export interface SpeechRecognitionServiceResult {
  result: string;
  isFinal: boolean;
}

export class SpeechRecognitionService {
  private recognition: SpeechRecognition;
  readonly onResultSubject = new Subject<SpeechRecognitionServiceResult>();
  readonly onEndSubject = new Subject();
  readonly onStartSubject = new Subject();
  readonly onStopSubject = new Subject();

  constructor() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = "ja-JP";
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      if (!event.results) {
        return;
      }
      const lastResult = event.results[event.results.length - 1];
      if (!lastResult.isFinal) {
        this.onResultSubject.next({
          result: "",
          isFinal: false,
        });
        return;
      }
      let ret = {
        result: lastResult[0].transcript,
        isFinal: true,
      };
      this.onResultSubject.next(ret);
    };

    this.recognition.onend = () => this.onEndSubject.next();
  }

  start() {
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
  }

  abort() {
    this.recognition.abort();
  }
}
