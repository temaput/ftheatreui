import React from 'react';
import Store from '../Store.js';
import FormActions from '../actions/FormActionCreators.js';
import Stepper from './Stepper.js';
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
    FormActions.getInitialData(this.props.predefinedData);
      /*
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
    */
  }


  getReservationForm() {
    return this.reservationForm;
  }

  getFilterForm() {
    return this.filterForm;
  }

  onScheduleFilterUpdate({performance, place}) {
    if (place && performance) {
      FormActions.getShows(performance, place);
    } else if (place) {
      FormActions.getPerformances(place)
    } else if (performance) {
      FormActions.getPlaces(performance)
    }
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


  renderStepChildren() {
    const subElementsTemplate = {
      ReservationForm: {
        type: ReservationForm,
        additionalProps: {
            onChange: this.onChangeFormData.bind(this),
            onSubmit: this.makeReservation.bind(this),
            ref: el => this.reservationForm = el
        },
      },
      ScheduleFilterForm: 
        {type: ScheduleFilterForm,},
      ShowSelect: {type: ShowSelect,},
    }
    return this.state.stepData.map(el => {
      const subElement = subElementsTemplate[el];
      return React.createElement(
        subElement.type,
        {...el.props, ...subElement.additionalProps},
      );
    });

  }

  render() {
    return (
      <div>
        <Stepper
          steps={this.state.steps}
          gotoNext={this.gotoNext.bind(this)}
          gotoPrevious={this.gotoPrevious.bind(this)}
        >
          {this.renderStepChildren()}
        </Stepper>
      </div>
    )
  }


}
