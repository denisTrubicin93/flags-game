

| Event Type                                                                       | Bubbles                                                                 | Cancelable | Default Action                      |                                            |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------- | ----------------------------------- | ------------------------------------------ |
| pointerover                                                                      | Yes                                                                     | Yes        | None                                |                                            |
| pointerenter                                                                     | No                                                                      | No         | None                                |                                            |
| pointerdown                                                                      | Yes                                                                     | Yes        | Varies: when the pointer is primary | all default actions of the mousedown event |
| Canceling this event also sets the PREVENT MOUSE EVENT flag for this pointerType | which prevents subsequent firing of certain compatibility mouse events. |            |                                     |                                            |
| pointermove                                                                      | Yes                                                                     | Yes        | Varies: when the pointer is primary | all default actions of mousemove           |
| pointerup                                                                        | Yes                                                                     | Yes        | Varies: when the pointer is primary | all default actions of mouseup             |
| pointercancel                                                                    | Yes                                                                     | No         | None                                |                                            |
| pointerout                                                                       | Yes                                                                     | Yes        | None                                |                                            |
| pointerleave                                                                     | No                                                                      | No         | None                                |                                            |
| gotpointercapture                                                                | Yes                                                                     | No         | None                                |                                            |
| lostpointercapture                                                               | Yes                                                                     | No         | None                                |                                            |


## pointerdown
pointerdownより前に pointerenter を呼ぶ必要がある

## pointerover

hoverをサポートしない(moveがない？)デバイスの場合は pointerenter の次に pointerover を呼ぶ必要がある。

## pointermove

## pointerout
pointeroverを読んだ場合は pointerleave した後に pointerout を呼ぶ
pointercancelした場合は pointerout を呼ぶ

## pointerleave

## gotpointercapture
## lostpointercapture

### シーケンス

pointerenter, 
(pointerover),
pointerdown
pointerup
pointerleave,
(pointerout)

# 仕様書抜粋
```
5.2 Pointer Event types
Below are the event types defined in this specification.

In the case of the primary pointer, these events (with the exception of gotpointercapture and lostpointercapture) may also fire compatibility mouse events.

5.2.1 The pointerover event
A user agent MUST fire a pointer event named pointerover when a pointing device is moved into the hit test boundaries of an element. Note that setPointerCapture or releasePointerCapture might have changed the hit test target and while a pointer is captured it is considered to be always inside the boundaries of the capturing element for the purpose of firing boundary events. A user agent MUST also fire this event prior to firing a pointerdown event for devices that do not support hover (see pointerdown).

5.2.2 The pointerenter event
A user agent MUST fire a pointer event named pointerenter when a pointing device is moved into the hit test boundaries of an element or one of its descendants, including as a result of a pointerdown event from a device that does not support hover (see pointerdown). Note that setPointerCapture or releasePointerCapture might have changed the hit test target and while a pointer is captured it is considered to be always inside the boundaries of the capturing element for the purpose of firing boundary events. This event type is similar to pointerover, but differs in that it does not bubble.

NOTE
There are similarities between this event type, the mouseenter event described in [UIEVENTS], and the CSS :hover pseudo-class described in [CSS21]. See also the pointerleave event.
5.2.3 The pointerdown event
A user agent MUST fire a pointer event named pointerdown when a pointer enters the active buttons state. For mouse, this is when the device transitions from no buttons depressed to at least one button depressed. For touch, this is when physical contact is made with the digitizer. For pen, this is when the pen either makes physical contact with the digitizer without any button depressed, or transitions from no buttons depressed to at least one button depressed while hovering.

NOTE
For mouse (or other multi-button pointer devices), this means pointerdown and pointerup are not fired for all of the same circumstances as mousedown and mouseup. See chorded buttons for more information.
For input devices that do not support hover, a user agent MUST also fire a pointer event named pointerover followed by a pointer event named pointerenter prior to dispatching the pointerdown event.

NOTE
Authors can prevent the firing of certain compatibility mouse events by canceling the pointerdown event (if the isPrimary property is true). This sets the PREVENT MOUSE EVENT flag on the pointer. Note, however, that this does not prevent the mouseover, mouseenter, mouseout, or mouseleave events from firing.
5.2.4 The pointermove event
A user agent MUST fire a pointer event named pointermove when a pointer changes coordinates. Additionally, when a pointer changes button state, pressure, tangential pressure, tilt, twist, or contact geometry (e.g. width and height) and the circumstances produce no other pointer events defined in this specification then a user agent MUST fire a pointer event named pointermove.

5.2.5 The pointerup event
A user agent MUST fire a pointer event named pointerup when a pointer leaves the active buttons state. For mouse, this is when the device transitions from at least one button depressed to no buttons depressed. For touch, this is when physical contact is removed from the digitizer. For pen, this is when the pen is removed from the physical contact with the digitizer while no button is depressed, or transitions from at least one button depressed to no buttons depressed while hovering.

For input devices that do not support hover, a user agent MUST also fire a pointer event named pointerout followed by a pointer event named pointerleave after dispatching the pointerup event.

NOTE
For mouse (or other multi-button pointer devices), this means pointerdown and pointerup are not fired for all of the same circumstances as mousedown and mouseup. See chorded buttons for more information.
5.2.6 The pointercancel event
A user agent MUST fire a pointer event named pointercancel in the following circumstances:

The user agent has determined that a pointer is unlikely to continue to produce events (for example, because of a hardware event).
After having fired the pointerdown event, if the pointer is subsequently used to manipulate the page viewport (e.g. panning or zooming).
NOTE
User agents can trigger panning or zooming through multiple pointer types (such as touch and pen), and therefore the start of a pan or zoom action may result in the cancellation of various pointers, including pointers with different pointer types.
Immediately before drag operation starts [HTML], for the pointer that caused the drag operation.
NOTE
If the start of the drag operation is prevented through any means (e.g. through calling preventDefault on the dragstart event) there will be no pointercancel event.
After firing the pointercancel event, a user agent MUST also fire a pointer event named pointerout followed by firing a pointer event named pointerleave.

NOTE
This section is non-normative.

Examples of scenarios in which a user agent might determine that a pointer is unlikely to continue to produce events include:

A device's screen orientation is changed while a pointer is active.
The user inputs a greater number of simultaneous pointers than is supported by the device.
The user agent interprets the input as accidental (for example, the hardware supports palm rejection).
The user agent interprets the input as a pan or zoom gesture.
Methods for changing the device's screen orientation, recognizing accidental input, or using a pointer to manipulate the viewport (e.g. panning or zooming) are out of scope for this specification.

5.2.7 The pointerout event
A user agent MUST fire a pointer event named pointerout when any of the following occurs:

A pointing device is moved out of the hit test boundaries of an element. Note that setPointerCapture or releasePointerCapture might have changed the hit test target and while a pointer is captured it is considered to be always inside the boundaries of the capturing element for the purpose of firing boundary events.
After firing the pointerup event for a device that does not support hover (see pointerup).
After firing the pointercancel event (see pointercancel).
When a pen stylus leaves the hover range detectable by the digitizer.
5.2.8 The pointerleave event
A user agent MUST fire a pointer event named pointerleave when a pointing device is moved out of the hit test boundaries of an element and all of its descendants, including as a result of a pointerup and pointercancel events from a device that does not support hover (see pointerup and pointercancel). Note that setPointerCapture or releasePointerCapture might have changed the hit test target and while a pointer is captured it is considered to be always inside the boundaries of the capturing element for the purpose of firing boundary events. User agents MUST also fire a pointer event named pointerleave when a pen stylus leaves hover range detectable by the digitizer. This event type is similar to pointerout, but differs in that it does not bubble and that it MUST not be fired until the pointing device has left the boundaries of the element and the boundaries of all of its descendants.

NOTE
There are similarities between this event type, the mouseleave event described in [UIEVENTS], and the CSS :hover pseudo-class described in [CSS21]. See also the pointerenter event.
5.2.9 The gotpointercapture event
A user agent MUST fire a pointer event named gotpointercapture when an element receives pointer capture. This event is fired at the element that is receiving pointer capture. Subsequent events for that pointer will be fired at this element. See the Setting Pointer Capture and Process Pending Pointer Capture sections.

5.2.10 The lostpointercapture event
A user agent MUST fire a pointer event named lostpointercapture after pointer capture is released for a pointer. This event MUST be fired prior to any subsequent events for the pointer after capture was released. This event is fired at the element from which pointer capture was removed. Subsequent events for the pointer follow normal hit testing mechanisms (out of scope for this specification) for determining the event target. See the Releasing Pointer Capture, Implicit Release of Pointer Capture, and Process Pending Pointer Capture sections.
```


### マウスイベントについて

```
4.3.4. Mouse Event Types
The Mouse event types are listed below. In the case of nested elements, mouse event types are always targeted at the most deeply nested element. Ancestors of the targeted element MAY use bubbling to obtain notification of mouse events which occur within its descendent elements.

4.3.4.1. auxclick
Type	auxclick
Interface	MouseEvent
Sync / Async	Sync
Bubbles	Yes
Trusted Targets	Element
Cancelable	Yes
Composed	Yes
Default action	Varies
Context
(trusted events)	
Event.target : topmost event target
UIEvent.view : Window
UIEvent.detail : indicates the current click count; the attribute value MUST be 1 when the user begins this action and increments by 1 for each click.
MouseEvent.screenX : value based on the pointer position on the screen
MouseEvent.screenY : value based on the pointer position on the screen
MouseEvent.clientX : value based on the pointer position within the viewport
MouseEvent.clientY : value based on the pointer position within the viewport
MouseEvent.altKey : true if Alt modifier was active, otherwise false
MouseEvent.ctrlKey : true if Control modifier was active, otherwise false
MouseEvent.shiftKey : true if Shift modifier was active, otherwise false
MouseEvent.metaKey : true if Meta modifier was active, otherwise false
MouseEvent.button : value based on current button pressed
MouseEvent.buttons : value based on all buttons currently depressed, 0 if no buttons pressed
MouseEvent.relatedTarget : null
The auxclick event type MUST be dispatched on the topmost event target indicated by the pointer, when the user presses down and releases the non-primary pointer button, or otherwise activates the pointer in a manner that simulates such an action. The actuation method of the mouse button depends upon the pointer device and the environment configuration, e.g., it MAY depend on the screen location or the delay between the press and release of the pointing device button.

The auxclick event should only be fired for the non-primary pointer buttons (i.e., when button value is not 0, buttons value is greater than 1). The primary button (like the left button on a standard mouse) MUST NOT fire auxclick events. See click for a corresponding event that is associated with the primary button.

The auxclick event MAY be preceded by the mousedown and mouseup events on the same element, disregarding changes between other node types (e.g., text nodes). Depending upon the environment configuration, the auxclick event MAY be dispatched if one or more of the event types mouseover, mousemove, and mouseout occur between the press and release of the pointing device button.

The default action of the auxclick event type varies based on the event target of the event and the value of the button or buttons attributes. Typical default actions of the auxclick event type are as follows:

If the event target has associated activation behavior, the default action MUST be to execute that activation behavior (see §3.5 Activation triggers and behavior).

Receiving and handling auxclick for the middle button.
myLink.addEventListener("auxclick", function(e) { if (e.button === 1) { // This would prevent the default behavior which is for example // opening a new tab when middle clicking on a link. e.preventDefault(); // Do something else to handle middle button click like taking // care of opening link or non-link buttons in new tabs in a way // that fits the app. Other actions like closing a tab in a tab-strip // which should be done on the click action can be done here too. } });

In the case of right button, the auxclick event is dispatched after any contextmenu event. Note that some user agents swallow all input events while a context menu is being displayed, so auxclick may not be available to applications in such scenarios. See this example for more clarification.

Receiving and handling auxlick for the right button
myDiv.addEventListener("contextmenu", function(e) { // This call makes sure no context menu is shown // to interfere with page receiving the events. e.preventDefault(); }); myDiv.addEventListener("auxclick", function(e) { if (e.button === 2) { // Do something else to handle right button click like opening a // customized context menu inside the app. } });

4.3.4.2. click
Type	click
Interface	MouseEvent
Sync / Async	Sync
Bubbles	Yes
Trusted Targets	Element
Cancelable	Yes
Composed	Yes
Default action	Varies
Context
(trusted events)	
Event.target : topmost event target
UIEvent.view : Window
UIEvent.detail : indicates the current click count; the attribute value MUST be 1 when the user begins this action and increments by 1 for each click.
MouseEvent.screenX : value based on the pointer position on the screen
MouseEvent.screenY : value based on the pointer position on the screen
MouseEvent.clientX : value based on the pointer position within the viewport
MouseEvent.clientY : value based on the pointer position within the viewport
MouseEvent.altKey : true if Alt modifier was active, otherwise false
MouseEvent.ctrlKey : true if Control modifier was active, otherwise false
MouseEvent.shiftKey : true if Shift modifier was active, otherwise false
MouseEvent.metaKey : true if Meta modifier was active, otherwise false
MouseEvent.button : value based on current button pressed
MouseEvent.buttons : value based on all buttons currently depressed, 0 if no buttons pressed
MouseEvent.relatedTarget : null
The click event type MUST be dispatched on the topmost event target indicated by the pointer, when the user presses down and releases the primary pointer button, or otherwise activates the pointer in a manner that simulates such an action. The actuation method of the mouse button depends upon the pointer device and the environment configuration, e.g., it MAY depend on the screen location or the delay between the press and release of the pointing device button.

The click event should only be fired for the primary pointer button (i.e., when button value is 0, buttons value is 1). Secondary buttons (like the middle or right button on a standard mouse) MUST NOT fire click events. See auxclick for a corresponding event that is associated with the non-primary buttons.

The click event MAY be preceded by the mousedown and mouseup events on the same element, disregarding changes between other node types (e.g., text nodes). Depending upon the environment configuration, the click event MAY be dispatched if one or more of the event types mouseover, mousemove, and mouseout occur between the press and release of the pointing device button. The click event MAY also be followed by the dblclick event.

If a user mouses down on a text node child of a <p> element which has been styled with a large line-height, shifts the mouse slightly such that it is no longer over an area containing text but is still within the containing block of that <p> element (i.e., the pointer is between lines of the same text block, but not over the text node per se), then subsequently mouses up, this will likely still trigger a click event (if it falls within the normal temporal hysteresis for a click), since the user has stayed within the scope of the same element. Note that user-agent-generated mouse events are not dispatched on text nodes.

In addition to being associated with pointer devices, the click event type MUST be dispatched as part of an element activation, as described in §3.5 Activation triggers and behavior.

For maximum accessibility, content authors are encouraged to use the click event type when defining activation behavior for custom controls, rather than other pointing-device event types such as mousedown or mouseup, which are more device-specific. Though the click event type has its origins in pointer devices (e.g., a mouse), subsequent implementation enhancements have extended it beyond that association, and it can be considered a device-independent event type for element activation.

The default action of the click event type varies based on the event target of the event and the value of the button or buttons attributes. Typical default actions of the click event type are as follows:

If the event target has associated activation behavior, the default action MUST be to execute that activation behavior (see §3.5 Activation triggers and behavior).

If the event target is focusable, the default action MUST be to give that element document focus.

4.3.4.3. dblclick
Type	dblclick
Interface	MouseEvent
Sync / Async	Sync
Bubbles	Yes
Trusted Targets	Element
Cancelable	Yes
Composed	Yes
Default action	None
Context
(trusted events)	
Event.target : topmost event target
UIEvent.view : Window
UIEvent.detail : indicates the current click count
MouseEvent.screenX : value based on the pointer position on the screen
MouseEvent.screenY : value based on the pointer position on the screen
MouseEvent.clientX : value based on the pointer position within the viewport
MouseEvent.clientY : value based on the pointer position within the viewport
MouseEvent.altKey : true if Alt modifier was active, otherwise false
MouseEvent.ctrlKey : true if Control modifier was active, otherwise false
MouseEvent.shiftKey : true if Shift modifier was active, otherwise false
MouseEvent.metaKey : true if Meta modifier was active, otherwise false
MouseEvent.button : value based on current button pressed
MouseEvent.buttons : value based on all buttons currently depressed, 0 if no buttons pressed
MouseEvent.relatedTarget : null
A user agent MUST dispatch this event when the primary button of a pointing device is clicked twice over an element. The definition of a double click depends on the environment configuration, except that the event target MUST be the same between mousedown, mouseup, and dblclick. This event type MUST be dispatched after the event type click if a click and double click occur simultaneously, and after the event type mouseup otherwise.

As with the click event, the dblclick event should only be fired for the primary pointer button. Secondary buttons MUST NOT fire dblclick events.

Canceling the click event does not affect the firing of a dblclick event.

As with the click event type, the default action of the dblclick event type varies based on the event target of the event and the value of the button or buttons attributes. Normally, the typical default actions of the dblclick event type match those of the click event type, with the following additional behavior:

If the event target is selectable, the default action MUST be to select part or all of the selectable content. Subsequent clicks MAY select additional selectable portions of that content.

4.3.4.4. mousedown
Type	mousedown
Interface	MouseEvent
Sync / Async	Sync
Bubbles	Yes
Trusted Targets	Element
Cancelable	Yes
Composed	Yes
Default action	Varies: Start a drag/drop operation; start a text selection; start a scroll/pan interaction (in combination with the middle mouse button, if supported)
Context
(trusted events)	
Event.target : topmost event target
UIEvent.view : Window
UIEvent.detail : indicates the current click count incremented by one. For example, if no click happened before the mousedown, detail will contain the value 1
MouseEvent.screenX : value based on the pointer position on the screen
MouseEvent.screenY : value based on the pointer position on the screen
MouseEvent.clientX : value based on the pointer position within the viewport
MouseEvent.clientY : value based on the pointer position within the viewport
MouseEvent.altKey : true if Alt modifier was active, otherwise false
MouseEvent.ctrlKey : true if Control modifier was active, otherwise false
MouseEvent.shiftKey : true if Shift modifier was active, otherwise false
MouseEvent.metaKey : true if Meta modifier was active, otherwise false
MouseEvent.button : value based on current button pressed
MouseEvent.buttons : value based on all buttons currently depressed, 0 if no buttons pressed
MouseEvent.relatedTarget : null
A user agent MUST dispatch this event when a pointing device button is pressed over an element.

Many implementations use the mousedown event to begin a variety of contextually dependent default actions. These default actions can be prevented if this event is canceled. Some of these default actions could include: beginning a drag/drop interaction with an image or link, starting text selection, etc. Additionally, some implementations provide a mouse-driven panning feature that is activated when the middle mouse button is pressed at the time the mousedown event is dispatched.

4.3.4.5. mouseenter
Type	mouseenter
Interface	MouseEvent
Sync / Async	Sync
Bubbles	No
Trusted Targets	Element
Cancelable	No
Composed	No
Default action	None
Context
(trusted events)	
Event.target : topmost event target
UIEvent.view : Window
UIEvent.detail : 0
MouseEvent.screenX : value based on the pointer position on the screen
MouseEvent.screenY : value based on the pointer position on the screen
MouseEvent.clientX : value based on the pointer position within the viewport
MouseEvent.clientY : value based on the pointer position within the viewport
MouseEvent.altKey : true if Alt modifier was active, otherwise false
MouseEvent.ctrlKey : true if Control modifier was active, otherwise false
MouseEvent.shiftKey : true if Shift modifier was active, otherwise false
MouseEvent.metaKey : true if Meta modifier was active, otherwise false
MouseEvent.button : 0
MouseEvent.buttons : value based on all buttons currently depressed, 0 if no buttons pressed
MouseEvent.relatedTarget : indicates the event target a pointing device is exiting, if any.
A user agent MUST dispatch this event when a pointing device is moved onto the boundaries of an element or one of its descendent elements. A user agent MUST also dispatch this event when the element or one of its descendants moves to be underneath the primary pointing device. This event type is similar to mouseover, but differs in that it does not bubble, and MUST NOT be dispatched when the pointer device moves from an element onto the boundaries of one of its descendent elements.

There are similarities between this event type and the CSS :hover pseudo-class [CSS2]. See also the mouseleave event type.

4.3.4.6. mouseleave
Type	mouseleave
Interface	MouseEvent
Sync / Async	Sync
Bubbles	No
Trusted Targets	Element
Cancelable	No
Composed	No
Default action	None
Context
(trusted events)	
Event.target : topmost event target
UIEvent.view : Window
UIEvent.detail : 0
MouseEvent.screenX : value based on the pointer position on the screen
MouseEvent.screenY : value based on the pointer position on the screen
MouseEvent.clientX : value based on the pointer position within the viewport
MouseEvent.clientY : value based on the pointer position within the viewport
MouseEvent.altKey : true if Alt modifier was active, otherwise false
MouseEvent.ctrlKey : true if Control modifier was active, otherwise false
MouseEvent.shiftKey : true if Shift modifier was active, otherwise false
MouseEvent.metaKey : true if Meta modifier was active, otherwise false
MouseEvent.button : 0
MouseEvent.buttons : value based on all buttons currently depressed, 0 if no buttons pressed
MouseEvent.relatedTarget : indicates the event target a pointing device is exiting, if any.
A user agent MUST dispatch this event when a pointing device is moved off of the boundaries of an element and all of its descendent elements. A user agent MUST also dispatch this event when the element or one of its descendants moves to be no longer underneath the primary pointing device. This event type is similar to mouseout, but differs in that does not bubble, and that it MUST NOT be dispatched until the pointing device has left the boundaries of the element and the boundaries of all of its children.

There are similarities between this event type and the CSS :hover pseudo-class [CSS2]. See also the mouseenter event type.

4.3.4.7. mousemove
Type	mousemove
Interface	MouseEvent
Sync / Async	Sync
Bubbles	Yes
Trusted Targets	Element
Cancelable	Yes
Composed	Yes
Default action	None
Context
(trusted events)	
Event.target : topmost event target
UIEvent.view : Window
UIEvent.detail : 0
MouseEvent.screenX : value based on the pointer position on the screen
MouseEvent.screenY : value based on the pointer position on the screen
MouseEvent.clientX : value based on the pointer position within the viewport
MouseEvent.clientY : value based on the pointer position within the viewport
MouseEvent.altKey : true if Alt modifier was active, otherwise false
MouseEvent.ctrlKey : true if Control modifier was active, otherwise false
MouseEvent.shiftKey : true if Shift modifier was active, otherwise false
MouseEvent.metaKey : true if Meta modifier was active, otherwise false
MouseEvent.button : 0
MouseEvent.buttons : value based on all buttons currently depressed, 0 if no buttons pressed
MouseEvent.relatedTarget : null
A user agent MUST dispatch this event when a pointing device is moved while it is over an element. The frequency rate of events while the pointing device is moved is implementation-, device-, and platform-specific, but multiple consecutive mousemove events SHOULD be fired for sustained pointer-device movement, rather than a single event for each instance of mouse movement. Implementations are encouraged to determine the optimal frequency rate to balance responsiveness with performance.

In some implementation environments, such as a browser, mousemove events can continue to fire if the user began a drag operation (e.g., a mouse button is pressed) and the pointing device has left the boundary of the user agent.

This event was formerly specified to be non-cancelable in DOM Level 2 Events [DOM-Level-2-Events], but was changed to reflect existing interoperability between user agents.

4.3.4.8. mouseout
Type	mouseout
Interface	MouseEvent
Sync / Async	Sync
Bubbles	Yes
Trusted Targets	Element
Cancelable	Yes
Composed	Yes
Default action	None
Context
(trusted events)	
Event.target : topmost event target
UIEvent.view : Window
UIEvent.detail : 0
MouseEvent.screenX : value based on the pointer position on the screen
MouseEvent.screenY : value based on the pointer position on the screen
MouseEvent.clientX : value based on the pointer position within the viewport
MouseEvent.clientY : value based on the pointer position within the viewport
MouseEvent.altKey : true if Alt modifier was active, otherwise false
MouseEvent.ctrlKey : true if Control modifier was active, otherwise false
MouseEvent.shiftKey : true if Shift modifier was active, otherwise false
MouseEvent.metaKey : true if Meta modifier was active, otherwise false
MouseEvent.button : 0
MouseEvent.buttons : value based on all buttons currently depressed, 0 if no buttons pressed
MouseEvent.relatedTarget : indicates the event target a pointing device is entering, if any.
A user agent MUST dispatch this event when a pointing device is moved off of the boundaries of an element or when the element is moved to be no longer underneath the primary pointing device. This event type is similar to mouseleave, but differs in that does bubble, and that it MUST be dispatched when the pointer device moves from an element onto the boundaries of one of its descendent elements.

See also the mouseover event type.

4.3.4.9. mouseover
Type	mouseover
Interface	MouseEvent
Sync / Async	Sync
Bubbles	Yes
Trusted Targets	Element
Cancelable	Yes
Composed	Yes
Default action	None
Context
(trusted events)	
Event.target : topmost event target
UIEvent.view : Window
UIEvent.detail : 0
MouseEvent.screenX : value based on the pointer position on the screen
MouseEvent.screenY : value based on the pointer position on the screen
MouseEvent.clientX : value based on the pointer position within the viewport
MouseEvent.clientY : value based on the pointer position within the viewport
MouseEvent.altKey : true if Alt modifier was active, otherwise false
MouseEvent.ctrlKey : true if Control modifier was active, otherwise false
MouseEvent.shiftKey : true if Shift modifier was active, otherwise false
MouseEvent.metaKey : true if Meta modifier was active, otherwise false
MouseEvent.button : 0
MouseEvent.buttons : value based on all buttons currently depressed, 0 if no buttons pressed
MouseEvent.relatedTarget : indicates the event target a pointing device is entering, if any.
A user agent MUST dispatch this event when a pointing device is moved onto the boundaries of an element or when the element is moved to be underneath the primary pointing device. This event type is similar to mouseenter, but differs in that it bubbles, and that it MUST be dispatched when the pointer device moves onto the boundaries of an element whose ancestor element is the event target for the same event listener instance.

See also the mouseout event type.

4.3.4.10. mouseup
Type	mouseup
Interface	MouseEvent
Sync / Async	Sync
Bubbles	Yes
Trusted Targets	Element
Cancelable	Yes
Composed	Yes
Default action	Invoke a context menu (in combination with the right mouse button, if supported)
Context
(trusted events)	
Event.target : topmost event target
UIEvent.view : Window
UIEvent.detail : indicates the current click count incremented by one.
MouseEvent.screenX : value based on the pointer position on the screen
MouseEvent.screenY : value based on the pointer position on the screen
MouseEvent.clientX : value based on the pointer position within the viewport
MouseEvent.clientY : value based on the pointer position within the viewport
MouseEvent.altKey : true if Alt modifier was active, otherwise false
MouseEvent.ctrlKey : true if Control modifier was active, otherwise false
MouseEvent.shiftKey : true if Shift modifier was active, otherwise false
MouseEvent.metaKey : true if Meta modifier was active, otherwise false
MouseEvent.button : value based on current button pressed
MouseEvent.buttons : value based on all buttons currently depressed, 0 if no buttons pressed
MouseEvent.relatedTarget : null
A user agent MUST dispatch this event when a pointing device button is released over an element.

Many implementations will invoke a context menu as the default action of this event if the right mouse button is being released.

In some implementation environments, such as a browser, a mouseup event can be dispatched even if the pointing device has left the boundary of the user agent, e.g., if the user began a drag operation with a mouse button pressed.

4.4. Wheel Events
Wheels are devices that can be rotated in one or more spatial dimensions, and which can be associated with a pointer device. The coordinate system depends on the environment configuration.

The user’s environment might be configured to associate vertical scrolling with rotation along the y-axis, horizontal scrolling with rotation along the x-axis, and zooming with rotation along the z-axis.

The deltaX, deltaY, and deltaZ attributes of WheelEvent objects indicate a measurement along their respective axes in units of pixels, lines, or pages. The reported measurements are provided after an environment-specific algorithm translates the actual rotation/movement of the wheel device into the appropriate values and units.

A user’s environment settings can be customized to interpret actual rotation/movement of a wheel device in different ways. One movement of a common dented mouse wheel can produce a measurement of 162 pixels (162 is just an example value, actual values can depend on the current screen dimensions of the user-agent). But a user can change their default environment settings to speed-up their mouse wheel, increasing this number. Furthermore, some mouse wheel software can support acceleration (the faster the wheel is rotated/moved, the greater the delta of each measurement) or even sub-pixel rotation measurements. Because of this, authors can not assume a given rotation amount in one user agent will produce the same delta value in all user agents.

The sign (positive or negative) of the values of the deltaX, deltaY, and deltaZ attributes MUST be consistent between multiple dispatches of the wheel event while the motion of the actual wheel device is rotating/moving in the same direction. If a user agent scrolls as the default action of the wheel event then the sign of the delta SHOULD be given by a right-hand coordinate system where positive X, Y, and Z axes are directed towards the right-most edge, bottom-most edge, and farthest depth (away from the user) of the document, respectively.

Individual user agents can (depending on their environment and hardware configuration) interpret the same physical user interaction on the wheel differently. For example, a vertical swipe on the edge of a trackpad from top to bottom can be interpreted as a wheel action intended to either scroll the page down or to pan the page up (i.e., resulting in either a positive or negative deltaY value respectively).

4.4.1. Interface WheelEvent
Introduced in this specification

The WheelEvent interface provides specific contextual information associated with wheel events.

To create an instance of the WheelEvent interface, use the WheelEvent constructor, passing an optional WheelEventInit dictionary.

```

### タッチイベントについて

https://www.w3.org/TR/touch-events/


| Event Type  | Sync / Async | Bubbling phase | Trusted proximal event              | target types | DOM interface | Cancelable | Default Action |                                             |           |         |
| ----------- | ------------ | -------------- | ----------------------------------- | ------------- | ---------- | -------------- | ------------------------------------------- | --------- | ------- | ----- |
| touchstart  | Sync         | Yes            | Document                            | Element       | TouchEvent | Yes            | undefined                                   |           |         |       |
| touchend    | Sync         | Yes            | Document                            | Element       | TouchEvent | Yes            | Varies: mousemove (If point has been moved) | mousedown | mouseup | click |
| touchmove   | Sync         | Yes            | Document                            | Element       | TouchEvent | Yes            | undefined                                   |           |         |       |
| touchcancel | Sync         | Yes            | Document                            | Element       | TouchEvent | No             | none                                        |           |         |       |
|             |              |                |                                     |               |            |                |                                             |           |         |       |

```
5.5 The touchstart event
A user agent must dispatch this event type to indicate when the user places a touch point on the touch surface.

The target of this event must be an Element. If the touch point is within a frame, the event should be dispatched to an element in the child browsing context of that frame.

If the preventDefault method is called on this event, it should prevent any default actions caused by any touch events associated with the same active touch point, including mouse events or scrolling.

5.6 The touchend event
A user agent must dispatch this event type to indicate when the user removes a touch point from the touch surface, also including cases where the touch point physically leaves the touch surface, such as being dragged off of the screen.

The target of this event must be the same Element on which the touch point started when it was first placed on the surface, even if the touch point has since moved outside the interactive area of the target element.

The touch point or points that were removed must be included in the changedTouches attribute of the TouchEvent, and must not be included in the touches and targetTouches attributes.

5.7 The touchmove event
A user agent must dispatch this event type to indicate when the user moves a touch point along the touch surface.

The target of this event must be the same Element on which the touch point started when it was first placed on the surface, even if the touch point has since moved outside the interactive area of the target element.

Note that the rate at which the user agent sends touchmove events is implementation-defined, and may depend on hardware capabilities and other implementation details.

If the preventDefault method is called on the first touchmove event of an active touch point, it should prevent any default action caused by any touchmove event associated with the same active touch point, such as scrolling.

5.8 The touchcancel event
A user agent must dispatch this event type to indicate when a touch point has been disrupted in an implementation-specific manner, such as a synchronous event or action originating from the UA canceling the touch, or the touch point leaving the document window into a non-document area which is capable of handling user interactions. (e.g. The UA's native user interface, plug-ins) A user agent may also dispatch this event type when the user places more touch points on the touch surface than the device or implementation is configured to store, in which case the earliest Touch object in the TouchList should be removed.

The target of this event must be the same Element on which the touch point started when it was first placed on the surface, even if the touch point has since moved outside the interactive area of the target element.

The touch point or points that were removed must be included in the changedTouches attribute of the TouchEvent, and must not be included in the touches and targetTouches attributes.
```


```
5. TouchEvent Interface
This interface defines the touchstart, touchend, touchmove, and touchcancel event types. TouchEvent objects are immutable; after one is created and initialized, its attributes must not change.

interface TouchEvent : UIEvent {
      readonly    attribute TouchList touches;
      readonly    attribute TouchList targetTouches;
      readonly    attribute TouchList changedTouches;
      readonly    attribute boolean   altKey;
      readonly    attribute boolean   metaKey;
      readonly    attribute boolean   ctrlKey;
      readonly    attribute boolean   shiftKey;
  };
5.1 Attributes
altKey of type boolean, readonly
true if the alt (Alternate) key modifier is activated; otherwise false
changedTouches of type TouchList, readonly
a list of Touches for every point of contact which contributed to the event.

For the touchstart event this must be a list of the touch points that just became active with the current event. For the touchmove event this must be a list of the touch points that have moved since the last event. For the touchend and touchcancel events this must be a list of the touch points that have just been removed from the surface.

ctrlKey of type boolean, readonly
true if the ctrl (Control) key modifier is activated; otherwise false
metaKey of type boolean, readonly
true if the meta (Meta) key modifier is activated; otherwise false. On some platforms this attribute may map to a differently-named key modifier.
shiftKey of type boolean, readonly
true if the shift (Shift) key modifier is activated; otherwise false
targetTouches of type TouchList, readonly
a list of Touches for every point of contact that is touching the surface and started on the element that is the target of the current event.
touches of type TouchList, readonly
a list of Touches for every point of contact currently touching the surface.
```
