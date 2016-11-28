import React from 'react';
import Store from '../Store.js';
import FormActions from '../actions/FormActionCreators.js';
import {Stepper, Step} from './Stepper.js';
import ReservationForm from './ReservationForm.js';
import ScheduleFilterForm from './ScheduleFilterForm.js';
import ShowSelect from './ShowSelect.js';

function getState() {
  return {
    fields: Store.getFields(),
    steps: Store.getSteps(),
  }
}


export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = getState();
  }

  getInitialData() {
    const {scheduleFilter: variables} = this.props.predefinedData;
    FormActions.getScheduleFilter(variables);
  }


  getReservationForm() {
    return this.reservationForm;
  }

  getFilterForm() {
    return this.filterForm;
  }


  onShowChoose(showId) {
    if (showId) {
        FormActions.gotoNext();
    }
  }

  onChange() {
    const newState = getState();
    this.setState(newState);
  }

  makeReservation(reservationData) {
    FormActions.makeReservation(reservationData)
  }

  gotoNext() {
    //validation first
    const errors = this.getReservationForm().validate();
    FormActions.formValidation(errors)
    if (Array.prototype.every(
      Object.keys(errors), fname => errors[fname]===null
    )) {
      FormActions.gotoNext() 
    }
  }

  gotoPrevious() {
    FormActions.gotoPrevious()
  }


  onChangeFormData(itemType, data, event) {
    FormActions.changeFormData(itemType, data, event)
    switch (itemType) {
      case 'performance':
      case 'place':
        this.getChoices();
        break;
      case 'show':
        // go to step 2
        FormActions.gotoNext();
        break;
      default:
        //no op
        
    }
  }

  componentDidMount() {
    Store.addChangeListener(this.onChange.bind(this));
    this.getInitialData();
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange.bind(this));
  }



  render() {
    const {componentProps} = this.props;

    return (
      <div>
        <Stepper
          steps={this.state.steps}
        >
          <Step 
            component={ScheduleFilter}
            componentProps={componentProps}
          gotoNext={this.gotoNext.bind(this)}
          gotoPrevious={this.gotoPrevious.bind(this)}
          />
          <Step 
            component={ReservationForm}
            componentProps={componentProps}
          gotoNext={this.gotoNext.bind(this)}
          gotoPrevious={this.gotoPrevious.bind(this)}
          />
          <Step 
            component={ReservationForm}
            componentProps={componentProps}
          gotoNext={this.gotoNext.bind(this)}
          gotoPrevious={this.gotoPrevious.bind(this)}
          />

        </Stepper>
      </div>
    )
  }


}
