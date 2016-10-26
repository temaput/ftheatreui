import React, {PropTypes} from 'react';
import classNames from 'classnames';
import {MDLComponent} from './utils.js';

const propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.node,
  label: PropTypes.string.isRequired,
  rows: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  options: PropTypes.array,
  multiple: PropTypes.bool,
};

const defaultProps = {
  type: "text",
  value: "",
}

function getState() {
  return {
    isFocused: false,
  }
}

export default class SelectField extends React.Component{

  constructor(props) {
    super(props)
    this.state = getState()
  }
  onFocus() {
    this.setState({isFocused: true});
  }

  onBlur() {
    this.setState({isFocused: false});
  }

  renderOptions() {
    const options = this.props.options.map(
      option => (
        <option key={option.value} value={option.value}>
          option.title
        </option>
      )
    );
    if (this.props.value === null) {
      options.unshift(<option key="emptyoption"></option>)
    }
    return options;
  }
  
  render() {
    const {
      className, error, label, ...inputProps
    } = this.props;

    const groupClass = classNames([
      "mdl-textfield",
      {
        'is-invalid': error,
        'is-focused': this.state.isFocused,
        'is-dirty': inputProps.value !== "", 
        'is-disabled': inputProps.disabled,
      },
      className,
    ]);

    const groupProps = {
      className: groupClass,
      onFocus: this.onFocus.bind(this),
      onBlur: this.onBlur.bind(this),
    };

    const inputClass = "mdl-textfield__input";

    const labelProps = {
      className: "mdl-textfield__label", htmlFor: inputProps.id
    };
    const errorProps = {className: "mdl-textfield__error"};

    return (
      <MDLComponent>
        <div {...groupProps} >
          <select className={inputClass} {...inputProps}
          ref={fieldNode => this.fieldNode = fieldNode}>
            {this.renderOptions()}
          </select>
          <label {...labelProps}>{label}{inputProps.required ? '*': ''}</label>
          <span {...errorProps}>{error}</span>
        </div>
      </MDLComponent>
    );
  }
}

SelectField.propTypes = propTypes;
SelectField.defaultProps = defaultProps;
