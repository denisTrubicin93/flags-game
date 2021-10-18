import { Pose } from "../Exercise/models";
import { Hand, Gesture } from "../Handtracking/models";

export interface MessageModel {
  message: Message,
}

export const initialState: MessageModel = {
  message: {
    cmd: 'hand',
    result: {
      hands: [],
      pose: {
        coordinates: [],
        width: 0,
        height: 0
      }
    }
  }
}

export interface ActionModel {
  value: any,
}

export interface HandPoint {
  point: string;
}

export interface HandMessage {
  cmd: 'hand';
  result: {
    hands: HandPoint | Hand[];
  };
}

export interface GestureMessage {
  cmd: 'gesture';
  result: Gesture[];
}


export interface PoseMessage {
  cmd: 'pose';
  result: {
    pose: Pose,
  };
}

export interface EventMessage {
  cmd: 'event';
  result: {
    event: 'squat' | 'flag' | 'kabeana' | 'ball_strike';
    image?: string;
    result: boolean | number;
    is_lower?: boolean | undefined;
    num_pose?: number | undefined;
  };
}
export interface SetCoordTransResponse {
  cmd: 'set_coord_trans',
  result: 'OK' | 'NG'
}

export type Message =
  HandMessage | GestureMessage | PoseMessage | EventMessage | SetCoordTransResponse;
