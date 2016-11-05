import React from 'react';
import classNames from 'classnames';
import TextField from '../../utils/MDLComponents/TextField.js';
import SelectField from '../../utils/MDLComponents/SelectField.js';
import FormActions from '../actions/FormActionCreators.js';
import {validateFormField} from '../validationUtils.js';
import {processId} from '../dataTraversing.js';

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
    this.props.onChange(itemType, processId(event.target.value))
  }

  onBlur(fname, event) {
    //validation here
    FormActions.formValidation(this.validateFormField(fname))
  }

  validate() {
    const errors = {};
    this.props.fields.forEach(
      f => !f.hidden && Object.assign(errors, this.validateFormField(f.id))
    );
    return errors;
  }

  validateFormField(fname) {
    const formField = this.formFields[fname];
    const {fieldNode} = formField;
    const {customErrorMessages} = this.props.fields[fname];
    const errors = {};
    errors[fname] = validateFormField(fieldNode, customErrorMessages);
    return errors;
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

  render() {
    const fields = this.props.fields.map(f => this.renderField(f));
    return (
      <form name="reservation-form">
        {fields}
      </form>
    )
  }
}
