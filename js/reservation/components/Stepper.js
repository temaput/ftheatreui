import React from 'react';
import classNames from 'classnames';
import Store from '../Store.js';

function getState() {
  return Store.getSteps()
}

const svgElements = {
  completePath: ("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 " +
    "10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"),
};

export default class Stepper extends React.Component {

  constructor(props) {
    super(props);
    this.state = getState();
  }

  onChange() {
    this.setState(getState());
  }

  componentDidMount() {
    Store.addChangeListener(this.onChange.bind(this))
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange.bind(this))
  }

  renderStepNumber(step) {
    const {current} = this.state;
    const completeLabel = (
      <svg 
        viewBox="0 0 24 24"
      >
        <path d={svgElements.completePath}></path>
      </svg>
    );
    const textLabel = (
      <svg 
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <text x="12" y="16" textAnchor="middle" 
          fontSize="12" fill="#fff">
          {step}
        </text>
      </svg>
    );

    const svgLabel = step < current ? completeLabel: textLabel;
    const spanClass = classNames([
      "reservation-stepper__number",
    ]);
    return (
      <span className={spanClass}>
        {svgLabel}
      </span>
    )
  }

  renderStepTitle(step, name) {
    const {current} = this.state;
    const stepNumber = this.renderStepNumber(step);
    const titleClass = classNames([
      'reservation-stepper__title',
    ]);
    return (
      <span className={titleClass}>
        {stepNumber}
        {name}
      </span>
    );
  }

  renderStepControls(step) {
    const {total} = this.state;
    const hasPrevious = step > 1;
    const hasFinish = step === total;
    const buttonBaseClass = [
      "mdl-button",
      "mdl-js-button",
    ];
    const secondaryButtonClass = classNames(buttonBaseClass);
    const primaryButtonClass = classNames([
      ...buttonBaseClass,
      "mdl-button--primary",
    ]);

    return (
        <div className="reservation-stepper__controls">
          <button className={primaryButtonClass} onClick={this.props.gotoNext}>
            {hasFinish ? 'Забронировать': 'Далее'}
          </button>
          <button 
            className={secondaryButtonClass} 
            disabled={!hasPrevious &&  "disabled"}
            onClick={this.props.gotoPrevious}
          >
            Назад
          </button>
        </div>
    )
  }

  renderStepContainer(step) {
    const controls = this.renderStepControls(step);
    return (
      <div className="reservation-stepper__container">
        <div className="reservation-stepper__children">
          {this.props.children}
        </div>
        {controls}
      </div>
    )
  }

  renderPlaceHolder() {
    return (
      <div className="reservation-stepper__placeholder">
        </div>
    )
  }

  render() {
    const {total, current, names} = this.state;
    const stepElements = new Array(total).fill().map((_, i) => {
      const step = i + 1;
      const name = names[i];
      const isCurrent = step === current;
      const isComplete = step < current;
      const stepperClass = classNames([
        'reservation-stepper__step',
        {'reservation-stepper__step--current': isCurrent},
        {'reservation-stepper__step--complete': isComplete},
      ]);

      return (
        <div key={i} className={stepperClass}>
          {this.renderStepTitle(step, name)}
          {isCurrent && this.renderStepContainer(step)}
          {this.renderPlaceHolder()}
        </div>
      )
      
    });
    return <div className="reservation-stepper">{stepElements}</div>
  }


}
