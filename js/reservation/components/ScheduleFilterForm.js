import React from 'react';
import classNames from 'classnames';
import SelectField from '../../utils/MDLComponents/SelectField.js';
import FormActions from '../actions/FormActionCreators.js';
import {validateFormField} from '../validationUtils.js';
import {
 getFieldsValues, groupFieldsBySteps, getCurrentStepFields
} from '../dataTraversing.js';
import {processId} from '../dataTraversing.js';


export default class ScheduleFilterForm extends React.Component {

  componentDidUpdate(prevProps, prevState) {
    const prevValues = getFieldsValues(prevProps.fields);
    const currentValues = getFieldsValues(this.props.fields);
    if (Object.keys(currentValues).some(
      key => prevValues[key] !== currentValues[key]
    )) {
      this.updateFilter();
    }
  }

  updateFilter() {
    this.props.updateFilter(getFieldsValues(this.props.fields));
  }

  onFilterChange(fname, event) {
    const value = processId(event.target.value);
    FormActions.changeFormData(fname, value);
  }

  renderFilterField(field) {
    const {customProps, customErrorMessages, ...inputProps} = field;
    if (field.options.length) {
      return (
        <SelectField {...inputProps}
          onChange={this.onFilterChange.bind(this, field.id)}
        />
      )
    }
  }

  render() {
    const filterFields = this.props.fields.map(f => this.renderFilterField(f));
    return (
      <form id="filter-form">
        {filterFields}
      </form>
    );
  }

}
