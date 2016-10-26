import React from 'react';
import Store from '../Store.js';
import FormActions from '../actions/FormActionCreators.js';
import ReservationForm from './ReservationForm.js';
import Stepper from './Stepper.js';
import {
  getFixedFields, getCurrentStepFields, getFieldById
} from '../dataTraversing.js';

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
    if (this.props.prescribedData) {
      const {currents, placesFirst} = this.props.prescribedData;
      if (currents) {
        const {place, performance} = currents;
        if (performance) {
          this.onChangeFormData('performance', performance);
        } else if (place) {
          this.onChangeFormData('place', place);
        }
      } else {
        placesFirst ? FormActions.getPlaces(): FormActions.getPerformances()
      }
    } else {
      FormActions.getPerformances()
    }

  }

  getFilterFields() {
    const filterFields = {place: null, performance: null, show: null};
    Object.keys(filterFields).forEach(
      fname => filterFields[fname] = getFieldById(this.state.fields, fname)
    );
    return filterFields;
  }

  getMoreData() {
    const {place, performance, show} = this.getFilterFields()
    if (place.value && performance.value && show.choicesObsolete) {
      FormActions.getShows(performance.value, place.value)
    }
  }

  getReservationForm() {
    return this.reservationForm;
  }

  onChange() {
    const newState = getState();
    this.setState(newState, () => this.getMoreData());
  }

  makeReservation(reservationData) {
    FormActions.makeReservation(reservationData)
  }

  gotoNext() {
    //validation first
    const errors = this.getReservationForm().validateCurrentStepFields();
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
    const fixedFields = getFixedFields(this.state.fields);
    const performanceIsFixed = fixedFields.some(f => f.name === 'performance');
    const placeIsFixed = fixedFields.some(f => f.name === 'place');

    FormActions.changeFormData(itemType, data, event)
     

    switch (itemType) {
      case 'performance':
        if (!placeIsFixed) {
          FormActions.getPlaces(data)
        }
        break;
      case 'place':
        if (!performanceIsFixed) {
          FormActions.getPerformances(data)
        }
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
    return (
      <div>
        <Stepper
          steps={this.state.steps}
          gotoNext={this.gotoNext.bind(this)}
          gotoPrevious={this.gotoPrevious.bind(this)}
        >
          <ReservationForm
            steps={this.state.steps}
            fields={this.state.fields}
            onChange={this.onChangeFormData.bind(this)}
            onSubmit={this.makeReservation.bind(this)}
            ref={el => this.reservationForm = el}
          />
        </Stepper>
      </div>
    )
  }


}
