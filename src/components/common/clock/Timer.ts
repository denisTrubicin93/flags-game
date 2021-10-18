import { BehaviorSubject, interval } from "rxjs";
import moment from "moment";
import "moment/locale/ja";

export class Timer {
  private static instance: Timer;
  readonly updateTime: BehaviorSubject<string> = new BehaviorSubject("");

  public static getInstance(): Timer {
    if (!Timer.instance) {
      Timer.instance = new Timer();
    }

    return Timer.instance;
  }

  private constructor() {
    interval(1000).subscribe(
      () => {
        this.update();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private update() {
    // moment().locale('ja')
    this.updateTime.next(moment().format("LT"));
  }
}
