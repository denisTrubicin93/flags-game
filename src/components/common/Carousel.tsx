import React, { memo, ReactChild } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import classNames from 'classnames';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
  })
);

type CarouselProps = {
  children: ReactChild[];
  className?: string;
  props?: any;
};

const Carousel = React.forwardRef((propParams: CarouselProps, ref) => {
  const { children, className, props } = propParams;
  const classes = useStyles();
  const cn = classNames(classes.root, className);
  return (
    <ReactCarousel
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      interval={20000}
      showArrows
      centerMode
      className={cn}
      {...props}
      ref={ref}
    >
      {children}
    </ReactCarousel>
  );
})

export default Carousel;
