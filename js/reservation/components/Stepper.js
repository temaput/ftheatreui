import React from 'react';
import classNames from 'classnames';
import Store from '../Store.js';


const svgElements = {
  completePath: ("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 " +
    "10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"),
};

export default class Stepper extends React.Component {

  constructor(props) {
    super(props);
  }

  renderStepNumber(step) {
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
          {step.number}
        </text>
      </svg>
    );

    const svgLabel = step.current ? completeLabel: textLabel;
    const spanClass = classNames([
      "reservation-stepper__number",
    ]);
    return (
      <span className={spanClass}>
        {svgLabel}
      </span>
    )
  }

  renderStepTitle(step) {
    const stepNumber = this.renderStepNumber(step);
    const {label} = step;
    const titleClass = classNames([
      'reservation-stepper__title',
    ]);
    return (
      <span className={titleClass}>
        {stepNumber}
        {label}
      </span>
    );
  }

  renderStepControls(step) {
    const {hasFinish, hasPrevious} = step;
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
    const {steps} = this.props;
    const stepElements = steps.map((step, i) => {
      const stepperClass = classNames([
        'reservation-stepper__step',
        {'reservation-stepper__step--current': step.isCurrent},
        {'reservation-stepper__step--complete': step.isComplete},
      ]);

      return (
        <div key={i} className={stepperClass}>
          {this.renderStepTitle(step)}
          {step.isCurrent && this.renderStepContainer(step)}
          {this.renderPlaceHolder()}
        </div>
      )
      
    });
    return (<div className="reservation-stepper">{stepElements}</div>)
  }


}
