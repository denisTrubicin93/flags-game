import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid } from '@material-ui/core';
import Loading from './Loading';

const SCROLL_OFFSET = 937 / 2;
class Iframe extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      loading: true,
      scrollPos: 0,
     };

    this.urls = [
      'https://www.aflac.co.jp/gan/days1all_in/simulation.html',
      'https://www.aflac.co.jp/iryo/everprime/simulation.html',
    ];
  }

  componentDidMount() {
    let iframe = ReactDOM.findDOMNode(this.myRef.current);
    iframe.addEventListener('load', () => {
      this.setState({
        loading: false,
      });

      if (this.props.url == 0) {
        let element_age = iframe.contentWindow.document.getElementById('age');
        let element_male = iframe.contentWindow.document.getElementById(
          'sex_male_ari'
        );
        let element_female = iframe.contentWindow.document.getElementById(
          'sex_female_nashi'
        );

        if (element_age && element_male && element_female) {
          element_age.value = this.props.age;
          if (this.props.gender == 'male') {
            element_male.checked = true;
            element_female.checked = false;
          } else {
            element_male.checked = false;
            element_female.checked = true;
          }

          const ev = document.createEvent('HTMLEvents');
          ev.initEvent('change', false, true);
          element_age.dispatchEvent(ev);
        }
      } else {
        let element_age = iframe.contentWindow.document.getElementsByName('age')[0];
        let element_male = iframe.contentWindow.document.getElementById(
          'sex_male'
        );
        let element_female = iframe.contentWindow.document.getElementById(
          'sex_female'
        );
        let element_everprime = iframe.contentWindow.document.getElementById(
          'everprime'
        );
        let element_ladys_everprime = iframe.contentWindow.document.getElementById(
          'ladys_everprime'
        );
        let element_everprime_jok = iframe.contentWindow.document.getElementById(
          'everprime_jok'
        );

        if (element_age && element_male && element_female) {
          element_age.value = this.props.age;
          if (this.props.gender == 'male') {
            element_male.checked = true;
            element_female.checked = false;
          } else {
            element_male.checked = false;
            element_female.checked = true;
          }
          if (this.props.type == 1) {
            element_everprime.checked = true;
            element_ladys_everprime.checked = false;
            element_everprime_jok.checked = false;
          } else if(this.props.type == 2) {
            element_everprime.checked = false;
            element_ladys_everprime.checked = true;
            element_everprime_jok.checked = false;
          } else {
            element_everprime.checked = false;
            element_ladys_everprime.checked = false;
            element_everprime_jok.checked = true;
          }

          const ev = document.createEvent('HTMLEvents');
          ev.initEvent('change', false, true);
          element_age.dispatchEvent(ev);
        }
      }
    });
  }

  public scrollUp() {
    const iframe = ReactDOM.findDOMNode(this.myRef.current);
    console.log('height: ', iframe.contentWindow.document.body.clientHeight);
    const height = iframe.contentWindow.document.body.clientHeight;
    let pos = (this.state.scrollPos - SCROLL_OFFSET < 0) ? 0 : this.state.scrollPos - SCROLL_OFFSET;
    if (this.state.scrollPos > height - SCROLL_OFFSET * 2) {
      pos = height - 3 * SCROLL_OFFSET;
    }
    console.log('scrollPos: ', pos);
    this.setState({
      scrollPos: pos
    });
    iframe.contentWindow.scrollTo(0, pos);
  }

  public scrollDown() {
    const iframe = ReactDOM.findDOMNode(this.myRef.current);
    console.log('height: ', iframe.contentWindow.document.body.clientHeight);
    const pos = Math.min(this.state.scrollPos + SCROLL_OFFSET, iframe.contentWindow.document.body.clientHeight)
    this.setState({
      scrollPos: pos
    });
    console.log('scrollPos: ', pos);
    iframe.contentWindow.scrollTo(0, pos);
  }

  render() {
    const iframeStyle = {
      width: '100%',
      height: '100%',
      border: '0',
      position: 'absolute',
      transform: 'scale(1.4)',
      left: 200,
      top: 295,
    };

    return (
      <Grid
        className={this.props.className}
        container
        justify="center"
        alignItems="center"
      >
        {this.state.loading && (
          <Loading color="white" height={300} width={300} />
        )}
        <iframe
          ref={this.myRef}
          src={this.urls[this.props.url]}
          frameBorder={'0'}
          // scrolling={'no'}
          width={'100%'}
          height={'100%'}
          style={iframeStyle}
          // sandbox=""
        />
      </Grid>
    );
  }
}

export default Iframe;
