import React from 'react';
import classNames from 'classnames';
import SelectField from '../../utils/MDLComponents/SelectField.js';
import FormActions from '../actions/FormActionCreators.js';
import {processId} from '../dataTraversing.js';



export default function ShowSelect(props) {
  const onShowChoose = (event) => { 
    const showId = processId(event.target.value);
    FormActions.onChangeFormData('show', showId);
    props.onShowChoose(showId);
  };

  return (
    <SelectField onChange={onShowChoose} {...props.show}/>
  )
}
