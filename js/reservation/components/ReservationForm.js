import React from 'react';
import classNames from 'classnames';
import TextField from '../../utils/MDLComponents/TextField.js';
import SelectField from '../../utils/MDLComponents/SelectField.js';
import FormActions from '../actions/FormActionCreators.js';
import {validateFormField} from '../../utils/ValidationUtils.js';
import {groupFieldsBySteps, getCurrentStepFields} from '../dataTraversing.js';

function _processId(id) {
  return Number(id)
}
function _optionTitle(itemType, option) {
  switch (itemType) {
    case 'performance':
    case 'place':
      return option.title
    case 'show':
      return `${_showtime(option)} (стоимость: ${option.price})`
  }
}

function _showtime(show) {
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Europe/Moscow',
  };
  return new Date(show.showtime * 1000).toLocaleString("ru-RU", options);
}

export default class ReservationForm extends React.Component {

  constructor(props) {
    super(props);
    this.formFields = {};
  }
  
  onDataInput(itemType, event) {
    this.props.onChange(itemType, event.target.value, event)
  }

  onChoose(itemType, event) {
    this.props.onChange(itemType, _processId(event.target.value))
  }

  onBlur(fname, event) {
    //validation here
    const errors = {};
    errors[fname] = this.validateFormField(fname);
    FormActions.formValidation(errors)
  }

  validateCurrentStepFields() {
    const {steps, fields} = this.props;

    const currentFields = getCurrentStepFields(steps, fields);
    const errors = {};
    currentFields.forEach(f => errors[f.id] = this.validateFormField(f.id));
    return errors;

  }

  validateFormField(fname) {
    const formField = this.formFields[fname];
    const {fieldNode} = formField;
    const {customErrorMessages} = this.props.fields[fname];
    return validateFormField(fieldNode, customErrorMessages);
  }

  renderField(field) {
    const {customProps, customErrorMessages, ...inputProps} = field;
    let formField;
    if (field.options !== undefined) {
      if (field.options.length) {
        formField = (
          <SelectField {...inputProps}
            onChange={this.onChoose.bind(this, field.id)}
            onBlur={this.onBlur.bind(this, field.id)}
          />
        )
      }
    } else {
      formField = (
        <TextField {...inputProps}
          onChange={this.onDataInput.bind(this, field.id)}
          onBlur={this.onBlur.bind(this, field.id)}
        />
      )
    }
    this.formFields[field.id] = formField;
    return formField;
  }

  renderFieldsBySteps() {
    const {steps, fields} = this.props;
    const fieldsBySteps = groupFieldsBySteps(steps, fields);

    return fieldsBySteps.map(step => {
      const fields = step.fields.map(
        (field, key) => {
          if (!field.hidden) {
            return <div key={key}>{this.renderField(field)}</div>
          }
        }
      )
      const stepClass = classNames([
        'reservation-form__step',
        {'reservation-form__step--hidden': !step.step.isCurrent},
      ]);
      return (
        <div key={step.step.number} className={stepClass}>
          {fields}
        </div>
      )
    });
  }

  render() {
    return (
      <form name="reservation-form">
        {this.renderFieldsBySteps()}
      </form>
    )
  }
}
