import { Tune } from '@material-ui/icons';
import { Subject } from 'rxjs';
import Websocket from '../components/network/Websocket';

export interface ServerResult {
  cmd: 'temp'  | 'poweron'  | 'poweroff';
  result: any;
}

export interface Person {
  id: number;
  state: 'detect' | 'gone' | 'fall' | 'away' | 'unknown';
}

export interface Face {
  gender: 'male' | 'female' | 'unknown';
  age: number;
}

export interface Temp {
    min: number;
    max: number;
  }

export class ThermalService {

  private static instance: ThermalService;

  readonly onDetectTempSubject = new Subject<number>();

  ws = new Websocket('ws://localhost:50300');

  powerOnCmd = '{"cmd":"poweron"}';
  powerOffCmd = '{"cmd":"poweroff"}';

  tempData:number[] = new Array(0)
  sampling = 5;
  startTime = 0;
  isConnected = false;
  adjust = -1;

  public static default(): ThermalService {
    if (!ThermalService.instance) {
        ThermalService.instance = new ThermalService();
    }
    return ThermalService.instance;
  }

  constructor() {

    this.tempData = [];

    this.ws?.onOpenSubject.subscribe(() => {
        this.isConnected = true;
    });
    this.ws?.onMessageSubject.subscribe((message: string) => {

        try {
        const result = JSON.parse(message) as ServerResult;

        switch (result.cmd) {
          case 'temp':
            this.updateTemp(result.result);
            break;
          case 'poweron':
            break;
          case 'poweroff':
            break;
          default:
            console.log(result);
            console.log('unknown command.');
            break;
        }
      } catch (error) {
        console.error(error);
      }
    });
    this.ws?.onCloseSubject.subscribe(() => {
        this.isConnected = false;
    })

    this.init();
  }

  init() {
    console.log("Temp Init")
    this.ws?.setupWebsocket();
    this.tempData = [];
  }

  close() {
    this.ws?.sendMessage(this.powerOffCmd);
    this.ws?.close();
  }

  start() {
    console.log("Temp Start")
    this.tempData = [];
    this.startTime = Date.now();
    if (!this.isConnected) {
        this.init();
        setTimeout(() => {
          this.ws?.sendMessage(this.powerOnCmd);
        }, 2000);

    } else {
      this.ws?.sendMessage(this.powerOnCmd);
    }

    setTimeout(() => {
      this.updateTemp({
        min: 0.0,
        max: 0.0
      });
    }, 7000);
  }

  stop() {
    this.onDetect()
    this.ws?.sendMessage(this.powerOffCmd);
  }

  updateTemp(data: Temp) {
      this.tempData.push(data.max + this.adjust);
      console.log(data);
      if (this.startTime > 0 && (Date.now() - this.startTime) > 3000) {
        this.startTime = 0
          this.stop();
      }
  }

  onDetect() {

    const length = this.tempData.length > this.sampling ? this.sampling : this.tempData.length;
    const values = this.tempData.slice(0, length);
    var result = -1;
    let max = 38
    let min = 35.5
    values.forEach( (item) => {
      if (item >= min && item <= max) {
        if (result < item) {
          result = item
        }
      }
    })
    this.onDetectTempSubject.next( Math.round((result) * 10) / 10);
  }

}
