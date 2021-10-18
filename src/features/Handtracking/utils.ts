import produce from 'immer';
import {
  CursorEventType,
  HandCursor,
  HandEventType,
  leftHandCursor,
  rightHandCursor,
  CursorState,
  HandIndex,
  SideOfHandEventType,
  Hand,
} from './models';
import {
  // sendMouseDown,
  // sendMouseEnter,
  // sendMouseLeave,
  // sendMouseMove,
  // sendMouseOut,
  // sendMouseOver,
  // sendMouseUp,
  sendPointerCancel,
  sendPointerDown,
  sendPointerEnter,
  sendPointerLeave,
  sendPointerMove,
  sendPointerOut,
  sendPointerOver,
  sendPointerUp,
  sendTouchCancel,
  sendTouchEnd,
  sendTouchMove,
  sendTouchStart,
} from './eventUtils';

import {
  HANDSIGN_HEIGHT,
  HANDSIGN_WIDTH,
  DOWN_MOVE_THRESHOLD,
  UP_MOVE_THRESHOLD,
  HOVER_CLICK_THRESHOLD,
  CANCEL_CLICK_CHATTERING_THRESHOLD,
  HOVER_CLICK_THRESHOLD_CIRCLE,
  STICKY_THRESHOLD,
  STICKY_MARGIN,
  ENABLE_HOVER_CLICK,
} from '../../containers/HandTracking/config';

import { GestureMessage, HandMessage } from '../Websocket/models';

// 画面上のheightをpxで取得する
const vh = (v: number) => {
  const h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return Math.ceil((v * h) / 100);
};

// 画面上の幅をpxで取得する
const vw = (v: number) => {
  const w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  return Math.ceil((v * w) / 100);
};

// const getCenttroid = (landmarks: { x: number; y: number; z: number }[]) => {
//   const landmarks2d = landmarks.map(lm => [lm.x, lm.y]);
//   // console.log(`landmarks: ${JSON.stringify(landmarks)}`);

//   const palms = landmarks2d.filter((_: any, index: any) => {
//     return [
//       HandLandmark.Wrist,
//       HandLandmark.ThumbCMC,
//       HandLandmark.IndexMCP,
//       HandLandmark.MiddleMCP,
//       HandLandmark.RingMCP,
//       HandLandmark.PinkyMCP,
//     ].includes(index);
//   });

//   const centroid = polygonCentroid(
//     palms.map((lm) => [lm[0], lm[1]])
//   );

//   return centroid;
// }

export const getTargetElement = (x: number, y: number): Element | undefined => {
  const elem = document
    .elementsFromPoint(x, y)
    .find(
      (e) => !e.isEqualNode(rightHandCursor) && !e.isEqualNode(leftHandCursor)
    );
  return elem;
};

export const getStickyElement = (x: number, y: number): Element | undefined => {
  const elem = document
    .elementsFromPoint(x, y)
    .find(
      (e) => e.getAttribute('data-sticky') === 'true'
    );
  return elem;
};

// メッセージからHandStateを作成する
export const createHandByPosition = (
  state: CursorState,
  msg: HandMessage
): CursorState => {
  const cursorState = produce(state, (draftState) => {
    if (!msg || !msg.result) return;

    draftState.hands[HandIndex.RIGHT].isExist = false;
    draftState.hands[HandIndex.LEFT].isExist = false;

    try {
      const hands = msg.result.hands as Hand[];
      if (hands.length > 0) {
        hands.forEach((hand) => {
          const lr = hand.classification.label;
          // eslint-disable-next-line prettier/prettier
          const handState = (lr === 'Right') ? draftState.hands[HandIndex.RIGHT] : draftState.hands[HandIndex.LEFT];

          handState.isExist = true;

          // 掌の中心を指定するバージョン
          const centroid = [hand.cPoint.x, hand.cPoint.y];

          // const isDown = isFingerDown(hand.landmarks);
          // handState.isDown = isDown;

          if (centroid) {
            // centroid の平均
            // 手の表示サイズは下記
            // width: `${HANDSIGN_WIDTH}px`,
            // height: `${HANDSIGN_HEIGHT}px`,
            // 前の位置との平均を取って更新する
            const x = 0.5 * (handState.x + centroid[0] * vw(100));
            const y = 0.5 * (handState.y + centroid[1] * vh(100));

            handState.x = x;
            handState.y = y;

            if (!handState.isDown) {
              // カーソルの下にあるHTML要素を取得する
              // ただし、カーソルそのものは除き、その下にあるものを取得する
              const elem = getTargetElement(handState.x, handState.y);

              // non-serializable なので Redux Toolkit の defaultMiddleware は使わない
              // Serializability Middleware を有効にすると error log が出力される
              // Immutability Middleware を有効にすると帰ってこなくなる
              handState.te = elem;
            }
          }
        });
      }
    } catch {

    }
  });
  return cursorState;
};

export const stickyToButton = (
  state: CursorState,
  next: CursorState
): CursorState => {
  const nextState = produce(next, (draft) => {
    const currentCursor = draft.hands.find(c => c.isExist);
    if (currentCursor) {
      const targetElement = getStickyElement(currentCursor.x, currentCursor.y);
      if (targetElement) {
        const x = currentCursor.x;
        const y = currentCursor.y;

        const clientRect = targetElement.getBoundingClientRect();

        if (Math.min(clientRect.width, clientRect.height) < STICKY_THRESHOLD) {
          const centerX = Math.ceil(clientRect.x + clientRect.width / 2);
          const centerY = Math.ceil(clientRect.y + clientRect.height / 2);
          currentCursor.x = centerX;
          currentCursor.y = centerY;
        } else {
          const xStart = clientRect.x + Math.ceil(clientRect.width * STICKY_MARGIN);
          const xEnd = clientRect.x + Math.floor(clientRect.width * (1 - STICKY_MARGIN));
          const yStart = clientRect.y + Math.ceil(clientRect.height * STICKY_MARGIN);
          const yEnd = clientRect.y + Math.floor(clientRect.height * (1 - STICKY_MARGIN));

          if (xStart < x && x < xEnd && yStart < y && y < yEnd) {
            const centerX = Math.ceil(clientRect.x + clientRect.width / 2);
            const centerY = Math.ceil(clientRect.y + clientRect.height / 2);
            currentCursor.x = centerX;
            currentCursor.y = centerY;
          }
        }
      }
    }
  });
  return nextState;
};

export const cancelChattering = (
  state: CursorState,
  next: CursorState
): CursorState => {
  const nextState = produce(next, (draft) => {
    [HandIndex.RIGHT, HandIndex.LEFT].forEach((index) => {
      const currCursor = state.hands[index];
      const nextCursor = draft.hands[index];
      if (currCursor.isExist && nextCursor.isExist) {
        if (
          Math.abs(currCursor.x - nextCursor.x) +
            Math.abs(currCursor.y - nextCursor.y) <
          (currCursor.isDown ? DOWN_MOVE_THRESHOLD : UP_MOVE_THRESHOLD)
        ) {
          if (currCursor.isDown === nextCursor.isDown) {
            nextCursor.x = currCursor.x;
            nextCursor.y = currCursor.y;
            nextCursor.te = currCursor.te;
          }
        }
      }
    });
  });

  return nextState;
};

export const resumeCursor = (
  state: CursorState
): CursorState => {
  const nextState = produce(state, (draft) => {
    [HandIndex.RIGHT, HandIndex.LEFT].forEach((index) => {
      const hand = draft.hands[index];
      if (hand.isExist) {
        hand.te = getStickyElement(hand.x, hand.y);
      }
      sendPointerEnter(hand);
      sendPointerOver(hand);

      draft.hoverClickPercent = 0;
      draft.hoverClickStatus = 'default';
      draft.isHovering = true;
      draft.hoverTimestamp = Date.now() + 250;
    });
  });
  return nextState;
}

export const updateButtonChanged = (
  now: CursorState,
  next: CursorState
): CursorState => {
  const nextState = produce(next, (draft) => {
    [HandIndex.RIGHT, HandIndex.LEFT].forEach((index) => {
      if (now.hands[index].isExist && draft.hands[index].isExist) {
        draft.hands[index].isButtonChanged =
          now.hands[index].isDown === draft.hands[index].isDown;
      }
    });
  });
  return nextState;
};

export const getSideOfHandEventType = (
  now: CursorState,
  next: CursorState,
): SideOfHandEventType => {
  let sideOfHandEventType: SideOfHandEventType = SideOfHandEventType.NOT_CHANGED;
  if (now.hands[HandIndex.RIGHT].isExist === next.hands[HandIndex.RIGHT].isExist &&
    now.hands[HandIndex.LEFT].isExist === next.hands[HandIndex.LEFT].isExist
  ) {
    // 両手の状態が同じ
    sideOfHandEventType = SideOfHandEventType.NOT_CHANGED;
  } else {
    // 右手が存在した
    if (now.hands[HandIndex.RIGHT].isExist) {
      // 右手がなくなった
      if (!next.hands[HandIndex.RIGHT].isExist) {
        // 左手が現れた
        if (next.hands[HandIndex.LEFT].isExist) {
          sideOfHandEventType = SideOfHandEventType.RIGHT_TO_LEFT;
        } else {
          // 右手も左手もない
          sideOfHandEventType = SideOfHandEventType.ANY_TO_NONE;
        }
      }
    } else if (now.hands[HandIndex.LEFT].isExist) {
      // 左手が存在
      if(!next.hands[HandIndex.LEFT].isExist) { // 左手がなくなった
        if (next.hands[HandIndex.RIGHT].isExist) { // 右手が現れた
          sideOfHandEventType = SideOfHandEventType.LEFT_TO_RIGHT;
        } else {
          sideOfHandEventType = SideOfHandEventType.ANY_TO_NONE;
        }
      }
    } else {
      // 右手も左手もなかった
      if (next.hands[HandIndex.RIGHT].isExist) {
        sideOfHandEventType = SideOfHandEventType.NONE_TO_RIGHT; //　右手が現れた
      } else if (next.hands[HandIndex.LEFT].isExist) {
        sideOfHandEventType = SideOfHandEventType.NONE_TO_LEFT; // 左手が現れた
      }
      // NOT_CHNGED
    }
  }
  return sideOfHandEventType;
};

export const updateHandCoordinates = (
  now: CursorState,
  next: CursorState,
) => {
  let event = getSideOfHandEventType(now, next);

};

export const createHandByGesture = (
  state: CursorState,
  msg: GestureMessage
): CursorState => {
  const { result } = msg;
  const nextCursorState = produce(state, (draft) => {
    if (result.length > 0) {
      const tmpHandStateRight = draft.hands[HandIndex.RIGHT];
      const tmpHandStateLeft = draft.hands[HandIndex.LEFT];
      result.forEach((gesture) => {
        const handCursor =
          gesture.label === 'Right' ? tmpHandStateRight : tmpHandStateLeft;

        switch (gesture.gesture) {
          case 'TWO':
          case 'THREE':
          case 'FOUR':
          case 'FIVE':
            handCursor.isExist = true;
            handCursor.isDown = false;
            break;
          case 'ONE':
          case 'FIST':
            handCursor.isExist = true;
            handCursor.isDown = true;
            break;
          default:
            const _exaustiveCheck: never = gesture.gesture;
            break;
        }
      });
    }
  });
  return nextCursorState;
};

export const updateHandGesture = (state: CursorState, msg: GestureMessage) => {
  const { result } = msg;
  const nextCursorState = produce(state, (draft) => {
    if (result.length > 0) {
      const tmpHandStateRight = draft.hands[HandIndex.RIGHT];
      const tmpHandStateLeft = draft.hands[HandIndex.LEFT];
      result.forEach((gesture) => {
        const handCursor =
          gesture.label === 'Right' ? tmpHandStateRight : tmpHandStateLeft;

        switch (gesture.gesture) {
          case 'TWO':
          case 'THREE':
          case 'FOUR':
          case 'FIVE':
            handCursor.isDown = false;
            break;
          case 'ONE':
          case 'FIST':
            handCursor.isDown = true;
            break;
          default:
            const _exaustiveCheck: never = gesture.gesture;
            break;
        }
      });
    }
  });
  return nextCursorState;
};

export const getEventType = (state: CursorState): HandEventType => {
  const handNum = state.hands.filter(h => h.isExist).length;
  if (handNum < 0 || handNum > 2) return HandEventType.NONE;
  return handNum as HandEventType;
};

export const getCursorEventType = (
  state: CursorState,
  next: CursorState
): CursorEventType => {
  const chev = getEventType(state);
  const nhev = getEventType(next);

  if (chev === HandEventType.NONE && nhev === HandEventType.NONE) return CursorEventType.NONE_TO_NONE;
  if (chev === HandEventType.NONE && nhev === HandEventType.POINTER) return CursorEventType.NONE_TO_POINTER;
  if (chev === HandEventType.NONE && nhev === HandEventType.TOUCH) return CursorEventType.NONE_TO_TOUCH;
  if (chev === HandEventType.POINTER && nhev === HandEventType.NONE) return CursorEventType.POINTER_TO_NONE;
  if (chev === HandEventType.POINTER && nhev === HandEventType.POINTER) return CursorEventType.POINTER_TO_POINTER;
  if (chev === HandEventType.POINTER && nhev === HandEventType.TOUCH) return CursorEventType.POINTER_TO_TOUCH;
  if (chev === HandEventType.TOUCH && nhev === HandEventType.NONE) return CursorEventType.TOUCH_TO_NONE;
  if (chev === HandEventType.TOUCH && nhev === HandEventType.POINTER) return CursorEventType.TOUCH_TO_POINTER;
  if (chev === HandEventType.TOUCH && nhev === HandEventType.TOUCH) return CursorEventType.TOUCH_TO_TOUCH;

  return CursorEventType.NONE_TO_NONE;
};

export const getPointerHand = (state: CursorState): HandCursor | undefined => {
  const cursor = state.hands.find((c) => c.isExist);
  return cursor;
};

export const sendHandCursorEvents = (
  state: CursorState,
  next: CursorState
): CursorState => {
  const nextState = produce(next, (draft) => {
    // カーソル状態がPOINTERかTOUCHかを判定
    // カーソル状態に変化がない時はHTMLELEMENTを跨いでいないかを判定
    // ボタンの状態を判定する
    // NONE -> MOUSE

    // NONE_TO_POINTER
    // NONE_TO_TOUCH
    // NONE_TO_NONE
    // POINTER_TO_POINTER
    // POINTER_TO_TOUCH
    // POINTER_TO_NONE
    // TOUCH_TO_POINTER
    // TOUCH_TO_TOUCH
    // TOUCH_TO_NONE
    const cursorEventType = getCursorEventType(state, next);
    switch (cursorEventType) {
      case CursorEventType.NONE_TO_NONE:
        // DO NOTHING.
        break;
      case CursorEventType.NONE_TO_POINTER:
        {
          const cursor = next.hands.find((h) => h.isExist);
          if (cursor) {
            sendPointerEnter(cursor);
            sendPointerOver(cursor);

            // sendMouseEnter(cursor);
            // sendMouseOver(cursor);

            draft.hoverTimestamp = Date.now();
            // console.log('NONE_TO_POINTER hoverTimestamp: ', draft.hoverTimestamp);

            draft.hoverClickPercent = 0;
            draft.hoverClickStatus = 'default';

            if (cursor.isDown) {
              sendPointerDown(cursor);
              // sendMouseDown(cursor);
            }
          }
        }
        break;
      case CursorEventType.NONE_TO_TOUCH:
        {
          // eslint-disable-next-line prettier/prettier
          const activeTouches = [next.hands[HandIndex.RIGHT], next.hands[HandIndex.LEFT]];
          // eslint-disable-next-line prettier/prettier
          const changedTouches = [next.hands[HandIndex.RIGHT], next.hands[HandIndex.LEFT]];
          sendTouchStart(activeTouches, changedTouches);
        }
        break;
      case CursorEventType.POINTER_TO_NONE:
        // (mouseup), mouseleave
        {
          const cursor = state.hands.find((h) => h.isExist);
          if (cursor) {
            if (cursor.isDown) {
              sendPointerUp(cursor);
              // sendMouseUp(cursor);
            }
            sendPointerCancel(cursor);
            sendPointerLeave(cursor);
            sendPointerOut(cursor);

            // sendMouseLeave(cursor);
            // sendMouseOut(cursor);
          }
          draft.hoverTimestamp = undefined;
          // console.log('POINTER_TO_NONE hoverTimestamp: ', draft.hoverTimestamp);
          draft.hoverClickPercent = 0;
          draft.hoverClickStatus = 'default';
        }
        break;
      case CursorEventType.POINTER_TO_POINTER:
        // 同じ要素内の場合はmove
        // 違う要素の場合は leave -> enter
        // パターンとしては
        // 同じ側の手で、 Up->Up, Up->Down, Down->Down, Down->Up
        // 違う手で、Up(Leave,Out)->(Enter,Over),((Up)), Up(Leave,Out)->(Enter,Over)Down, Down(Up,Leave,Over)->(Enter,Over)Down, Down(Up,Leave,Over)->(Enter,Over)((Up))
        {
          const currPointer = state.hands.find((c) => c.isExist);
          const nextPointer = next.hands.find((c) => c.isExist);

          // 同じ側の手
          if (currPointer?.id === nextPointer?.id) {
            // 要素の変更はあるか？
            const te = currPointer?.te as HTMLDivElement;
            const nextTe = nextPointer?.te as HTMLDivElement;
            // Up->Up, Up->Down, Down->Down
            if (te === nextTe) {
              if (ENABLE_HOVER_CLICK === 'true' && currPointer?.isDown === nextPointer?.isDown) {
                // 同じ要素の上を hover で一定時間経過するとclickイベントを発生させる
                // console.log('POINTER_TO_POINTER hoverTimestamp 1: ', draft.hoverTimestamp);
                if (
                  !nextPointer?.isDown &&
                  draft.hoverTimestamp &&
                  Date.now() - draft.hoverTimestamp > HOVER_CLICK_THRESHOLD
                ) {
                  nextPointer && sendPointerDown(nextPointer);
                  setTimeout(() => {
                    nextPointer && sendPointerUp(nextPointer);
                  }, CANCEL_CLICK_CHATTERING_THRESHOLD);
                  draft.hoverTimestamp = Date.now();

                  draft.hoverClickPercent = 0;
                  draft.hoverClickStatus = 'default';

                } else {
                  nextPointer && sendPointerMove(nextPointer);
                  // nextPointer && sendMouseMove(nextPointer);

                  if (draft.hoverTimestamp) {
                    let percent = Math.round((Date.now() - draft.hoverTimestamp) / HOVER_CLICK_THRESHOLD_CIRCLE * 100.0);

                    if (percent < 15) {
                      percent = 0;
                    }

                    draft.hoverClickPercent = percent;

                    if (percent < 35) {
                      draft.hoverClickStatus = 'default';
                    } else if (percent < 65) {
                      draft.hoverClickStatus = 'success';
                    } else if (percent < 90) {
                      draft.hoverClickStatus = 'active';
                    } else {
                      draft.hoverClickStatus = 'error';
                    }
                  }
                }

                // nextPointer && sendPointerMove(nextPointer);
                // // nextPointer && sendMouseMove(nextPointer);
              } else if (nextPointer?.isDown) {
                nextPointer && sendPointerDown(nextPointer);
                // nextPointer && sendMouseDown(nextPointer);
                draft.hoverTimestamp = undefined;
                // console.log('POINTER_TO_POINTER hoverTimestamp 3: ', draft.hoverTimestamp);

              } else if (!nextPointer?.isDown) {
                currPointer && sendPointerUp(currPointer);
                // currPointer && sendMouseUp(currPointer);
                draft.hoverTimestamp = Date.now();
                // console.log('POINTER_TO_POINTER hoverTimestamp 4: ', draft.hoverTimestamp);

                draft.hoverClickPercent = 0;
                draft.hoverClickStatus = 'default';

              }
            } else {
              // 前のターゲットにキャンセルを送る
              if (currPointer) {
                if (currPointer.isDown) {
                  sendPointerUp(currPointer);
                  // sendMouseUp(currPointer);
                }
                sendPointerCancel(currPointer);
                sendPointerLeave(currPointer);
                sendPointerOut(currPointer);

                // sendMouseLeave(currPointer);
                // sendMouseOut(currPointer);
                draft.hoverTimestamp = undefined;
                // console.log('POINTER_TO_POINTER hoverTimestamp 5: ', draft.hoverTimestamp);

              }
              // 次のターゲットにEnterを送る
              if (nextPointer) {
                sendPointerEnter(nextPointer);
                sendPointerOver(nextPointer);

                // sendMouseEnter(nextPointer);
                // sendMouseOver(nextPointer);

                if (nextPointer.isDown) {
                  sendPointerDown(nextPointer);
                  // sendMouseDown(nextPointer);
                }
                draft.hoverTimestamp = Date.now();
                // console.log('POINTER_TO_POINTER hoverTimestamp 6: ', draft.hoverTimestamp);

                draft.hoverClickPercent = 0;
                draft.hoverClickStatus = 'default';

              }
            }
          } else {
            // 違う手
            if (currPointer) {
              if (currPointer.isDown) {
                sendPointerUp(currPointer);
                // sendMouseUp(currPointer);
              }
              sendPointerCancel(currPointer);
              sendPointerLeave(currPointer);
              sendPointerOut(currPointer);

              // sendMouseLeave(currPointer);
              // sendMouseOut(currPointer);
            }
            if (nextPointer) {
              sendPointerEnter(nextPointer);
              sendPointerOver(nextPointer);

              // sendMouseEnter(nextPointer);
              // sendMouseOver(nextPointer);

              if (nextPointer.isDown) {
                sendPointerDown(nextPointer);
                // sendMouseDown(nextPointer);
              }
            }
            draft.hoverTimestamp = Date.now();

            draft.hoverClickPercent = 0;
            draft.hoverClickStatus = 'default';

          }
        }
        break;
      case CursorEventType.POINTER_TO_TOUCH:
        {
          // (mouseup), mouseleave
          const cursor = state.hands.find((h) => h.isExist);
          if (cursor) {
            if (cursor.isDown) {
              sendPointerUp(cursor);
              // sendMouseUp(cursor);
            }
            sendPointerCancel(cursor);
            sendPointerLeave(cursor);
            sendPointerOut(cursor);

            // sendMouseLeave(cursor);
            // sendMouseOut(cursor);
          }
          // touchstart
          const activeTouches = [next.hands[HandIndex.RIGHT], next.hands[HandIndex.LEFT]];
          const changedTouches = [next.hands[HandIndex.RIGHT], next.hands[HandIndex.LEFT]];

          // nextState.activeTouches = activeTouches;
          // nextState.changedTouches = changedTouches;
          sendTouchStart(activeTouches, changedTouches);
        }
        break;
      case CursorEventType.TOUCH_TO_NONE:
        {
          const activeTouches = [state.hands[HandIndex.RIGHT], state.hands[HandIndex.LEFT]];
          const changedTouches = [state.hands[HandIndex.RIGHT], state.hands[HandIndex.LEFT]];
          sendTouchEnd(activeTouches, changedTouches);
          sendTouchCancel(activeTouches, changedTouches);
        }
        break;
      case CursorEventType.TOUCH_TO_POINTER:
        {
          // touchcancel
          // touchstart
          const activeTouches = [state.hands[HandIndex.RIGHT], state.hands[HandIndex.LEFT]];
          const changedTouches = [state.hands[HandIndex.RIGHT], state.hands[HandIndex.LEFT]];
          sendTouchCancel(activeTouches, changedTouches);

          const cursor = next.hands.find(h => h.isExist);
          if (cursor) {
            sendPointerEnter(cursor);
            sendPointerOver(cursor);

            // sendMouseEnter(cursor);
            // sendMouseOver(cursor);

            if (cursor.isDown) {
              sendPointerDown(cursor);
              // sendMouseDown(cursor);
            }
          }
        }
        break;
      case CursorEventType.TOUCH_TO_TOUCH:
        {
          // 同じ要素内の移動 / 要素が変わった場合
          const currTouch = state.hands[HandIndex.RIGHT];
          const nextTouch = next.hands[HandIndex.RIGHT];

          const currTe = currTouch.te as HTMLDivElement;
          const nextTe = nextTouch.te as HTMLDivElement;
          if (currTe === nextTe) {
            const activeTouches = [state.hands[HandIndex.RIGHT], state.hands[HandIndex.LEFT]];
            const changedTouches = [state.hands[HandIndex.RIGHT], state.hands[HandIndex.LEFT]];
            sendTouchMove(activeTouches, changedTouches);
          } else {
            // 前の要素にキャンセルを送り、次の要素にstartを送る
            {
              const activeTouches = [state.hands[HandIndex.RIGHT], state.hands[HandIndex.LEFT]];
              const changedTouches = [state.hands[HandIndex.RIGHT], state.hands[HandIndex.LEFT]];
              sendTouchEnd(activeTouches, changedTouches);
              sendTouchCancel(activeTouches, changedTouches);
            }
            // {
            //   // touchstart
            //   const activeTouches = [nextState.hands[HandIndex.RIGHT], nextState.hands[HandIndex.LEFT]];
            //   const changedTouches = [nextState.hands[HandIndex.RIGHT], nextState.hands[HandIndex.LEFT]];
            //   nextState.activeTouches = activeTouches;
            //   nextState.changedTouches = changedTouches;
            //   sendTouchStart(activeTouches, changedTouches);
            // }
          }
        }
        break;
      default:
        break;
    }
  });
  return nextState;
};
