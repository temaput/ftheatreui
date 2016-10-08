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
  pattern: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.node,
  label: PropTypes.string.isRequired,
  rows: PropTypes.number,
  onChange: PropTypes.func,
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

export default class TextField extends React.Component{

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

    const inputTag = inputProps.rows && 
      inputProps.rows > 1 ? 'textarea' : 'input';

    const inputNode = React.createElement(
      inputTag,
      {className: "mdl-textfield__input", ...inputProps}
    );

    const labelProps = {
      className: "mdl-textfield__label", htmlFor: inputProps.id
    };
    const errorProps = {className: "mdl-textfield__error"};

    return (
      <MDLComponent>
        <div {...groupProps} >
          {inputNode}
          <label {...labelProps}>{label}{inputProps.required ? '*': ''}</label>
          <span {...errorProps}>{error}</span>
        </div>
      </MDLComponent>
    );
  }
}

TextField.propTypes = propTypes;
TextField.defaultProps = defaultProps;
