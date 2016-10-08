import React from 'react';
import classNames from 'classnames';
import TextField from '../../utils/MDLComponents/TextField.js';

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
function _selectLabel(itemType) {
  switch (itemType) {
    case 'performance':
      return "Спектакль"
    case 'place':
      return "Площадка"
    case 'show':
      return "Дата показа"
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



class ChoiceElement extends React.Component {

  renderOptions() {
    const itemType = this.props.name;
    const options = this.props.options.map(
      option => (
        <option key={option.id} value={option.id}>
          {_optionTitle(itemType, option)}
        </option>
      )
    );
    if (this.props.selected === undefined) {
      options.unshift(<option key="emptyoption"></option>)
    }
    return options;
  }

  render() {
    const options = this.renderOptions();
    return (
      <select 
        name={this.props.name} 
        value={this.props.selected} 
        onChange={this.props.onChange}>
        {options}
      </select>
    )
  }
}

export default class ReservationForm extends React.Component {


  renderContactElements() {
    const inputs = [
      {id: 'email', label: "email", type: "email", required: true}, 
      {id: 'firstName', label: "Имя"},
      {id: 'lastName', label: "Фамилия"},
      {id: 'tel', label: "Мобильный телефон", pattern: "[\d]{5,20}"}, 
    ]

    const {errors, currents} = this.props;

    return inputs.map((input, key) => {
      const error = errors[input.id];
      const value = currents[input.id];
      const onChange = this.onDataInput.bind(this, input.id)
      const props = {error, value, onChange, ...input}
      return (
        <TextField {...props} key={key} />
      );
    });
  }

  renderChoiceElements() {
    const {choices, currents} = this.props
    return Object.keys(choices).map(
      itemType => (
        <ChoiceElement 
          key={itemType}
          name={itemType}
          options={choices[itemType]}
          selected={currents[itemType]}
          onChange={this.onChoose.bind(this, itemType)}
        />
      )
    );

  }

  renderConfirmationElements() {
    return (<div></div>)
  }

  onDataInput(itemType, event) {
    this.props.onChange(itemType, event.target.value, event)
  }

  onChoose(itemType, event) {
    this.props.onChange(itemType, _processId(event.target.value))
  }

  render() {
    const choiceElements = this.renderChoiceElements();
    const contactElements = this.renderContactElements();
    const confirmationElements = this.renderConfirmationElements();
    const {step} = this.props;
    const stepBaseClass = 'reservation-form__step';
    const stepActiveClass = stepBaseClass + ' reservation-form__step--active';
    const stepInActiveClass = stepBaseClass + ' reservation-form__step--hidden';

    return (
    <form name="reservation-form">

      <div className={step===1 ? stepActiveClass: stepInActiveClass}>
        {choiceElements}
      </div>
      <div className={step===2 ? stepActiveClass: stepInActiveClass}>
        {contactElements}
      </div>
      <div className={step===3 ? stepActiveClass: stepInActiveClass}>
        {confirmationElements}
      </div>
    </form>
    )
  }
}
