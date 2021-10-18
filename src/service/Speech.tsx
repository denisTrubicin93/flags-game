
import { Subject } from 'rxjs';

export interface RecognizedResult {
  text: string;
}

export default class SpeechToText {
  private static instance: SpeechToText;

  // private sdk = require("microsoft-cognitiveservices-speech-sdk");

  private sdk = require("microsoft-cognitiveservices-speech-sdk")
  private recognizer: any

  readonly onRecognizedResultSubject = new Subject<RecognizedResult>();

  public static init(): SpeechToText {
    if (!SpeechToText.instance) {
      SpeechToText.instance = new SpeechToText();
    }

    return SpeechToText.instance;
  }

  fromMic() {
    // const sdk = require("microsoft-cognitiveservices-speech-sdk");
    const speechConfig = this.sdk.SpeechConfig.fromSubscription("8733b1548a5f42a29a754c85bc29b200", "japaneast");
    speechConfig.speechRecognitionLanguage = "ja-JP";

    let audioConfig = this.sdk.AudioConfig.fromDefaultMicrophoneInput();
    this.recognizer = new this.sdk.SpeechRecognizer(speechConfig, audioConfig);

    console.log('Speak into your microphone.');
    this.recognizer.recognizeOnceAsync(result => {
        console.log(`RECOGNIZED: Text=${result.text}`);
    });

    this.recognizer.recognizing = (s, e) => {
    console.log(`RECOGNIZING: (recognizing)Text=${e.result.text}`);
    };

    this.recognizer.recognized = (s, e) => {
        if (e.result.reason == this.sdk.ResultReason.RecognizedSpeech) {
            console.log(`RECOGNIZED: (recognized)Text=${e.result.text}`);
            this.onResult(e.result.text)
        }
        else if (e.result.reason == this.sdk.ResultReason.NoMatch) {
            console.log("NOMATCH: Speech could not be recognized.");
        }
    };

    this.recognizer.canceled = (s, e) => {
        console.log(`CANCELED: Reason=${e.reason}`);

        if (e.reason == this.sdk.CancellationReason.Error) {
            console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
            console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
            console.log("CANCELED: Did you update the subscription info?");
        }

        this.recognizer.stopContinuousRecognitionAsync();
    };

    this.recognizer.sessionStopped = (s, e) => {
        console.log("\n    Session stopped event.");
        this.recognizer.stopContinuousRecognitionAsync();
    };

    // if(!on){
    //   this.recognizer.stopContinuousRecognitionAsync();
    //   console.log("off");
    // }else{
    //   this.recognizer.startContinuousRecognitionAsync();
    //   console.log("on");
    // }

    // Start async recognition.
    this.recognizer.startContinuousRecognitionAsync();

  }

  stopMic() {
    if (this.recognizer) {
      this.recognizer.stopContinuousRecognitionAsync();
    }
  }

  onResult(text: string) {
    this.onRecognizedResultSubject.next({
      text: text,
    });

  }
}

