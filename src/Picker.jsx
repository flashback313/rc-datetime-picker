import React, { Component } from 'react';
import classNames from 'classnames/bind';
import blacklist from 'blacklist';

import Calendar from './panels/Calendar.jsx';
import Time from './panels/Time.jsx';
import Shortcuts from './panels/Shortcuts.jsx';

class Picker extends Component {
  constructor() {
    super();
    this.state = {
      panel: 'calendar'
    };
  }

  changePanel = panel => {
    this.setState({
      panel
    });
  };

  render() {
    const {
      isOpen = true,
      shortcuts,
      splitPanel,
      showTimePicker = true,
      showCalendarPicker = true
    } = this.props;
    const { panel } = this.state;
    const isTimePanel = panel === 'time';
    const isCalendarPanel = panel === 'calendar';
    const className = classNames('datetime-picker', this.props.className, {
      split: splitPanel
    });
    const props = blacklist(this.props, 'className', 'splitPanel', 'isOpen');

    return (
      <div
        className={className}
        style={{ display: isOpen ? 'block' : 'none' }}
        onClick={evt => evt.stopPropagation()}
      >
        {shortcuts ? <Shortcuts {...props} /> : undefined}

        {showCalendarPicker ? (
          <Calendar
            {...props}
            isOpen={isOpen}
            style={{
              display: isCalendarPanel || !splitPanel ? 'block' : 'none'
            }}
          />
        ) : (
          undefined
        )}

        {showTimePicker ? (
          <Time
            {...props}
            style={{ display: isTimePanel || !splitPanel ? 'block' : 'none' }}
          />
        ) : (
          undefined
        )}

        {splitPanel ? (
          <div className="panel-nav">
            {panel === 'calendar' ? (
              <button
                type="button"
                onClick={this.changePanel.bind(this, 'time')}
                className={isTimePanel ? 'active' : ''}
              >
                Time
              </button>
            ) : (
              <button
                type="button"
                onClick={this.changePanel.bind(this, 'calendar')}
                className={isCalendarPanel ? 'active' : ''}
              >
                Date
              </button>
            )}
          </div>
        ) : (
          undefined
        )}
      </div>
    );
  }
}

export default Picker;
