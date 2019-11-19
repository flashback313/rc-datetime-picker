import React, { Component } from 'react';
import { render } from 'react-dom';
import moment from 'moment';

import { DatetimePickerTrigger } from '../dist/rc-datetime-picker';
import { DatetimePicker, DatetimeRangePicker } from '../dist/rc-datetime-picker';
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
    const { moment, range } = this.state;

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
        <DatetimeRangePicker
          moment={range}
          showTimePicker
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
    const shortcuts = {
      Today: moment(),
      Yesterday: moment().subtract(1, 'days'),
      Clear: ''
    };
    const { datetime } = this.state;
    const value = datetime ? datetime.format('YYYY/MM/DD HH:mm') : '';

    return (
      <DatetimePickerTrigger
        shortcuts={shortcuts}
        moment={datetime}
        onChange={this.handleChange}
        appendToBody
      >
        <input type="text" value={value} readOnly />
        <span className="fa fa-calendar-o"></span>
      </DatetimePickerTrigger>
    );
  }
}

render(<InlinePicker />, document.getElementById('inline-picker'));

render(<PopupPicker />, document.getElementById('popup-picker'));
