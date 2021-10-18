/**
 * code from
 * https://github.com/akiran/react-slick/issues/848#issuecomment-682490158
 *
 */
import React, { PropsWithChildren, Ref, useState, useEffect } from "react";
import Slider, { Settings as SliderProps } from "react-slick";
import { slickStyles as styles } from "./SlickStyles";
import { Box, makeStyles } from '@material-ui/core';

export type DefaultSliderProps = SliderProps & { movedragThreshold?: number, slickStyles?: {} };

/**
 * Threshold from which mouse movement with pressed mouse button
 * is considered a drag instead of a click.
 */
const MoveDragThreshold = 10;


function useDragDetection(threshold: number): {
  handleMouseDown: () => void;
  dragging: boolean;
} {
  const [mouseDown, setMouseDown] = useState(false);
  const [dragging, setDragging] = useState(true);

  useEffect(() => {
    let mouseMove = 0;

    function handleMouseUp(): void {
      console.log('handleMouseUp')

      setMouseDown(false);
    }

    function handleMouseMove(e: MouseEvent): void {
      mouseMove += Math.abs(e.movementX) + Math.abs(e.movementY);
      setDragging(mouseMove > threshold);
    }

    if (mouseDown) {
      document.addEventListener("pointerup", handleMouseUp);
      document.addEventListener("pointermove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      document.removeEventListener("pointerup", handleMouseUp);
      document.removeEventListener("pointermove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown]);

  function handleMouseDown(): void {
    setMouseDown(true);
    setDragging(false);
  }

  return {
    handleMouseDown,
    dragging,
  };
}

const DefaultSlider: React.ForwardRefRenderFunction<Slider, PropsWithChildren<DefaultSliderProps>> = (props, ref) => {
  const { children, movedragThreshold, slickStyles, ...sliderProps } = props;
  const threshold = movedragThreshold || MoveDragThreshold;

  const __slickStyles = { 'slickParent': { ...styles['slickParent'], ...slickStyles } }
  const classes = makeStyles(__slickStyles)();

  const {
    handleMouseDown,
    dragging,
  } = useDragDetection(threshold);

  function handleChildClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    console.log('handleChildClick: ', dragging)
    if (dragging) {
      e.stopPropagation();
    }
  }

  const newProps = {
    onMouseDownCapture: handleMouseDown,
    onClickCapture: handleChildClick
  }

  return (
    <Box className={classes.slickParent}>
      <Slider {...sliderProps} ref={ref}>
        {React.Children.map(children, (child) => {
          switch(typeof child) {
            case 'string':
              return child;
            case 'object':
                return React.cloneElement(child as React.ReactElement<any>, newProps);
            default:
              return null;
          }
        })}
      </Slider>
    </Box>
  );
}

export const ClickableSlider = React.forwardRef(DefaultSlider);
