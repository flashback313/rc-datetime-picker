import React, { Component } from 'react';
// import TimePicker from 'rc-time-picker';
import moment from 'moment';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: this.getCurrentMoment(props)
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      moment: this.getCurrentMoment(props)
    });
  }

  getCurrentMoment = props => {
    const { range, rangeAt } = props;
    let result = props.moment;

    if (result) {
      if (range) {
        result =
          result[rangeAt] ||
          moment()
            .hours(0)
            .minutes(0);
      }
    } else {
      result = moment()
        .hours(0)
        .minutes(0);
    }

    return result;
  };

  handleChange = value => {
    const { onChange, rangeAt, moment } = this.props;
    if (onChange) {
      if (rangeAt) {
        onChange(
          Object.assign({}, moment, {
            [rangeAt]: value
          })
        );
      } else {
        onChange(value);
      }
    }
  };

  render() {
    const { style, moment, rangeAt } = this.props;
    const val = moment[rangeAt];
    return (
      <div style={style}>
        <div className="time">
          <div className="rc-calendar-time-picker">
            <div className="rc-calendar-time-picker-panel">
              <TimePickerPanel
                value={val}
                format={'HH:mm'}
                showHour
                showMinute
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Time;
