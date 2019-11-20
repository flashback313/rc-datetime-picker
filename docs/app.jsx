import React, { Component } from 'react';
import { render } from 'react-dom';
import moment from 'moment';

import {
  DatetimePicker,
  DatetimeRangePickerTrigger
} from '../dist/rc-datetime-picker';
import './app.less';

class InlinePicker extends Component {
  constructor() {
    super();
    this.state = {
      moment: moment(),
      range: {
        start: moment(),
        end: moment()
      }
    };
  }

  handleChange = moment => {
    this.setState({
      moment
    });
  };

  render() {
    const { moment } = this.state;

    return (
      <div>
        <span className="text">
          Datetime: {moment.format('YYYY/MM/DD HH:mm')}
        </span>
        <DatetimePicker
          moment={moment}
          onChange={this.handleChange}
          splitPanel
        />
      </div>
    );
  }
}

class PopupPicker extends Component {
  constructor() {
    super();
    this.state = {
      datetime: moment()
    };
  }

  handleChange = moment => {
    this.setState({
      datetime: moment
    });
  };

  render() {
    // const shortcuts = {
    //   Today: moment(),
    //   Yesterday: moment().subtract(1, 'days'),
    //   Clear: ''
    // };
    // const { datetime } = this.state;
    // const value = datetime ? datetime.format('YYYY/MM/DD HH:mm') : '';

    return (
      <div>
        <DatetimeRangePickerTrigger
          moment={{ start: moment(), end: moment() }}
          showTimePicker
          appendToBody
          align="top"
          splitPanel
        >
          <input value="123" />
        </DatetimeRangePickerTrigger>
      </div>
    );
  }
}

render(<InlinePicker />, document.getElementById('inline-picker'));

render(<PopupPicker />, document.getElementById('popup-picker'));
