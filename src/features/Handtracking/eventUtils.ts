import { HandCursor, HandIndex } from './models';

const sendTouchEvent = (
  eventType: string,
  bubbles: boolean,
  cancelable: boolean,
  activeTouches: HandCursor[],
  changedTouches: HandCursor[]) => {

  const l = activeTouches[HandIndex.LEFT];
  const r = activeTouches[HandIndex.RIGHT];
  const at = [
    new Touch({
      identifier: r.id,
      target: r.te || document,
      clientX: r.x || 0,
      clientY: r.y || 0,
      pageX: r.x || 0,
      pageY: r.y || 0,
      screenX: r.x || 0,
      screenY: r.y || 0,
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 10,
      force: 0.5,
    }),
    new Touch({
      identifier: l.id,
      target: r.te || document, // 右手の要素を使う
      clientX: l.x || 0,
      clientY: l.y || 0,
      pageX: l.x || 0,
      pageY: l.y || 0,
      screenX: l.x || 0,
      screenY: l.y || 0,
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 10,
      force: 0.5,
    }),
  ];

  const cl = changedTouches[HandIndex.LEFT];
  const cr = changedTouches[HandIndex.RIGHT];

  const ct = [
    new Touch({
      identifier: cr.id,
      target: cr.te || document,
      clientX: cr.x || 0,
      clientY: cr.y || 0,
      pageX: cr.x || 0,
      pageY: cr.y || 0,
      screenX: cr.x || 0,
      screenY: cr.y || 0,
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 10,
      force: 0.5,
    }),
    new Touch({
      identifier: cl.id,
      target: cr.te || document, // 右手のターゲットを使う
      clientX: cl.x || 0,
      clientY: cl.y || 0,
      pageX: cl.x || 0,
      pageY: cl.y || 0,
      screenX: cl.x || 0,
      screenY: cl.y || 0,
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 10,
      force: 0.5,
    }),
  ]

  const touchEvent = new TouchEvent(eventType, {
    cancelable: cancelable,
    bubbles: bubbles,
    touches: at,
    targetTouches: at,
    changedTouches: ct,
  });

  // console.log('activeTouches: ', activeTouches);
  const currentTouch = changedTouches[0] || activeTouches[0];
  currentTouch.te?.dispatchEvent(touchEvent);
};

export const sendTouchStart = (activeTouches: HandCursor[], changedTouches: HandCursor[]) => {
  // console.log('touchstart: ', activeTouches[0]);
  sendTouchEvent("touchstart", true, true, activeTouches, changedTouches);
}
export const sendTouchEnd = (activeTouches: HandCursor[], changedTouches: HandCursor[]) => {
  // console.log('touchend: ', activeTouches[0]);
  sendTouchEvent("touchend", true, true, activeTouches, changedTouches);
}
export const sendTouchMove = (activeTouches: HandCursor[], changedTouches: HandCursor[]) => {
  // console.log('touchmove: ', activeTouches[0]);
  sendTouchEvent("touchmove", true, true, activeTouches, changedTouches);
}
export const sendTouchCancel = (activeTouches: HandCursor[], changedTouches: HandCursor[]) => {
  // console.log('touchcancel: ', activeTouches[0]);
  sendTouchEvent("touchcancel", true, false, activeTouches, changedTouches);
}


const sendMouseEvent = (
  eventType: string,
  bubbles: boolean,
  cancelable: boolean,
  state: HandCursor,
) => {
  const { x, y } = state;
  const te = state.te;
  if (!te) return;

  const mouseEvent = new MouseEvent(eventType, {
    bubbles: bubbles,
    cancelable: cancelable,
    view: document.defaultView,
    button: 0,
    buttons: state.isDown ? 1 : 0,
    clientX: x,
    clientY: y,
  });

  te?.dispatchEvent(mouseEvent);
};

export const sendMouseDown = (cursor: HandCursor) => {
  sendMouseEvent("mousedown", true, true, cursor);
}
export const sendMouseEnter = (cursor: HandCursor) => {
  sendMouseEvent("mouseenter", false, false, cursor);
}
export const sendMouseLeave = (cursor: HandCursor) => {
  sendMouseEvent("mouseleave", false, false, cursor);
}
export const sendMouseMove = (cursor: HandCursor) => {
  sendMouseEvent("mousemove", true, true, cursor);
}
export const sendMouseOut = (cursor: HandCursor) => {
  sendMouseEvent("mouseout", true, true, cursor);
}
export const sendMouseOver = (cursor: HandCursor) => {
  sendMouseEvent("mouseover", true, true, cursor);
}
export const sendMouseUp = (cursor: HandCursor) => {
  sendMouseEvent("mouseup", true, true, cursor);
}


const sendPointerEvent = (
  eventType: string,
  bubbles: boolean,
  cancelable: boolean,
  state: HandCursor,
) => {
  const { id, x, y, isButtonChanged } = state;
  const te = state.te;

  if (!te) return;

  const button = (eventType === 'pointerup') ? 0 : (isButtonChanged) ? 0 : -1;
  const buttons = (eventType === 'pointerup') ? 0 : (state.isDown) ? 1 : 0;
  const pressure = (eventType === 'pointerup') ? 0 : (state.isDown) ? 0.5 : 0;

  const pointerEvent = new PointerEvent(eventType, {
    bubbles: bubbles,
    cancelable: cancelable,
    pointerType: 'touch',
    view: document.defaultView,
    pointerId: id,
    button: button,
    buttons: buttons,
    clientX: x,
    clientY: y,
    pressure: pressure,
  });

  // pointerEvent.setPointerCapture = pointerEvent.releasePointerCapture = function() { };
  te.setPointerCapture = te.releasePointerCapture = function() { };

  te?.dispatchEvent(pointerEvent);
};

export const sendPointerOver = (cursor: HandCursor) => {
  sendPointerEvent("pointerover", true, true, cursor);
}

export const sendPointerEnter = (cursor: HandCursor) => {
  sendPointerEvent("pointerenter", false, false, cursor);
}

export const sendPointerDown = (cursor: HandCursor) => {
  sendPointerEvent("pointerdown", true, true, cursor);
}

export const sendPointerMove = (cursor: HandCursor) => {
  sendPointerEvent("pointermove", true, true, cursor);
}

export const sendPointerUp = (cursor: HandCursor) => {
  sendPointerEvent("pointerup", true, true, cursor);
}

export const sendPointerCancel = (cursor: HandCursor) => {
  sendPointerEvent("pointercancel", true, false, cursor);
}

export const sendPointerOut = (cursor: HandCursor) => {
  sendPointerEvent("pointerout", true, true, cursor);
}

export const sendPointerLeave = (cursor: HandCursor) => {
  sendPointerEvent("pointerleave", false, false, cursor);
}

export const sendPointerGotCapture = (cursor: HandCursor) => {
  sendPointerEvent("gotpointercapture", true, false, cursor);
}

export const sendPointerLostCapture = (cursor: HandCursor) => {
  sendPointerEvent("lostpointercapture", true, false, cursor);
}
