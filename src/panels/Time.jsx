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

  handleChange = (type, value) => {
    const { onChange, range, rangeAt } = this.props;
    const _moment = this.state.moment.clone();
    let selected = this.props.moment;

    _moment[type](value);

    if (range) {
      const copyed = selected ? Object.assign(selected, {}) : {};

      copyed[rangeAt] = _moment;
    } else {
      selected = _moment;
    }

    this.setState({
      moment: _moment
    });
    onChange && onChange(selected);
  };

  render() {
    // const _moment = this.state.moment;
    const { style } = this.props;

    return (
      <div style={style}>
        <div className="time">
          <div className="rc-calendar-time-picker">
            <div className="rc-calendar-time-picker-panel">
              <TimePickerPanel value={moment()} format={'HH:mm'} showHour showMinute  />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Time;
