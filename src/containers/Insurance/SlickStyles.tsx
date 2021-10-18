import { makeStyles } from '@material-ui/core/styles'

const useSlickStyles = makeStyles({
  slickParent : {
    '& .slick-slider.slick-initialized': {
      display: 'block'
    },
    '& .slick-slider': {
      position: 'relative',
      display: 'none',
      boxSizing: 'border-box',
      webkitUserSelect: 'none',
      mozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none',
      webkitTouchCallout: 'none',
      khtmlUserSelect: 'none',
      msTouchAction: 'pan-y',
      touchAction: 'pan-y',
      webkitTapHighlightColor: 'transparent'
    },
    '& .slick-list': {
      position: 'relative',
      display: 'block',
      overflow: 'hidden',
      margin: '0',
      padding: '0'
    },
    '& .slick-list:focus': {
      outline: 'none'
    },
    '& .slick-list.dragging': {
      cursor: 'hand',
      fallbacks: [
        {
          cursor: 'pointer'
        }
      ]
    },
    '& .slick-slider .slick-track, .slick-slider .slick-list': {
      webkitTransform: 'translate3d(0, 0, 0)',
      mozTransform: 'translate3d(0, 0, 0)',
      msTransform: 'translate3d(0, 0, 0)',
      oTransform: 'translate3d(0, 0, 0)',
      transform: 'translate3d(0, 0, 0)'
    },
    '& .slick-track': {
      position: 'relative',
      top: '0',
      left: '0',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    '& .slick-track:before, .slick-track:after': {
      display: 'table',
      content: '\'\''
    },
    '& .slick-track:after': {
      clear: 'both'
    },
    '& .slick-loading .slick-track': {
      visibility: 'hidden'
    },
    '& .slick-slide': {
      display: 'none',
      float: 'left',
      height: '100%',
      minHeight: 1,
    },
    '& [dir=\'rtl\'] .slick-slide': {
      float: 'right'
    },
    '& .slick-slide img': {
      display: 'block'
    },
    '& .slick-slide.slick-loading img': {
      display: 'none'
    },
    '& .slick-slide.dragging img': {
      pointerEvents: 'none'
    },
    '& .slick-initialized .slick-slide': {
      display: 'block'
    },
    '& .slick-loading .slick-slide': {
      visibility: 'hidden'
    },
    '& .slick-vertical .slick-slide': {
      display: 'block',
      height: 'auto',
      border: '1px solid transparent'
    },
    '& .slick-arrow.slick-hidden': {
      display: 'none'
    },
    '& .slick-prev, .slick-next': {
      fontSize: '0',
      lineHeight: '0',
      position: 'absolute',
      top: '50%',
      display: 'inline-block',
      width: 50,
      height: '90%',
      padding: '0',
      webkitTransform: 'translate(0, -50%)',
      msTransform: 'translate(0, -50%)',
      transform: 'translate(0, -50%)',
      cursor: 'pointer',
      color: 'transparent',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      zIndex: 10
    },
    '& .slick-prev:hover, .slick-prev:focus, .slick-next:hover, .slick-next:focus': {
      color: 'transparent',
      outline: 'none',
      background: 'rgba(255,255,255, 0.1)'
    },
    '& .slick-prev:hover:before, .slick-prev:focus:before, .slick-next:hover:before, .slick-next:focus:before': {
      opacity: '1'
    },
    '& .slick-prev.slick-disabled:before, .slick-next.slick-disabled:before': {
      opacity: '.25'
    },
    '& .slick-prev:before, .slick-next:before': {
      fontFamily: '\'slick\'',
      fontSize: 16,
      lineHeight: '1',
      opacity: '.75',
      color: 'white',
      webkitFontSmoothing: 'antialiased',
      mozOsxFontSmoothing: 'grayscale'
    },
    '& .slick-prev': {
      left: 0,
      borderTopRightRadius: '25px',
      borderBottomRightRadius: '25px'
    },
    '& [dir=\'rtl\'] .slick-prev': {
      right: 0,
      left: 'auto'
    },
    '& .slick-prev:before': {
      content: '\'◀︎\''
    },
    '& [dir=\'rtl\'] .slick-prev:before': {
      content: '\'▶︎\''
    },
    '& .slick-next': {
      right: 0,
      borderTopLeftRadius: '25px',
      borderBottomLeftRadius: '25px'
    },
    '& [dir=\'rtl\'] .slick-next': {
      right: 'auto',
      left: 0
    },
    '& .slick-next:before': {
      content: '\'▶︎\''
    },
    '& [dir=\'rtl\'] .slick-next:before': {
      content: '\'◀︎\''
    },
    '& .slick-dotted.slick-slider': {
      marginBottom: 30
    },
    '& .slick-dots': {
      position: 'absolute',
      bottom: -25,
      display: 'block',
      width: '100%',
      padding: '0',
      margin: '0',
      listStyle: 'none',
      textAlign: 'center'
    },
    '& .slick-dots li': {
      position: 'relative',
      display: 'inline-block',
      width: 20,
      height: 20,
      margin: '0 5px',
      padding: '0',
      cursor: 'pointer'
    },
    '& .slick-dots li button': {
      fontSize: '0',
      lineHeight: '0',
      display: 'block',
      width: 20,
      height: 20,
      padding: 5,
      cursor: 'pointer',
      color: 'transparent',
      border: '0',
      outline: 'none',
      background: 'transparent'
    },
    '& .slick-dots li button:hover, .slick-dots li button:focus': {
      outline: 'none'
    },
    '& .slick-dots li button:hover:before, .slick-dots li button:focus:before': {
      opacity: '1'
    },
    '& .slick-dots li button:before': {
      fontFamily: '\'slick\'',
      fontSize: 6,
      lineHeight: 20,
      position: 'absolute',
      top: '0',
      left: '0',
      width: 20,
      height: 20,
      content: '\'•\'',
      textAlign: 'center',
      opacity: '.25',
      color: 'black',
      webkitFontSmoothing: 'antialiased',
      mozOsxFontSmoothing: 'grayscale'
    },
    '& .slick-dots li.slick-active button:before': {
      opacity: '.75',
      color: 'black'
    }
  }
});

export {
  useSlickStyles
}
