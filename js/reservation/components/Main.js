import React from 'react';
import Store from '../Store.js';
import FormActions from '../actions/FormActionCreators.js';
import ReservationForm from './ReservationForm.js';
import Stepper from './Stepper.js';

function getState() {
  return {
    choices: Store.getChoices(),
    currents: Store.getCurrents(),
    status: Store.getStatus(),
    steps: Store.getSteps(),
    errors: Store.getErrors(),
  }
}


export default class Main extends React.Component {

  constructor(props) {
    super(props)
    this.state = getState()
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

  getMoreData() {
    const {currents, choices, status} = this.state;
    if (currents.place && currents.performance && !status.showsUpdated) {
      FormActions.getShows(currents.performance, currents.place)
    }
  }



  onChange() {
    const newState = getState();
    this.setState(newState, () => this.getMoreData());
  }

  makeReservation(reservationData) {
    FormActions.makeReservation(reservationData)
  }

  gotoNext() {
    FormActions.gotoNext() 
  }

  gotoPrevious() {
    FormActions.gotoPrevious()
  }

  onChangeFormData(itemType, data, event) {
    const {currents} = this.state;
    const {placesFirst} = this.props.prescribedData;
    FormActions.changeFormData(itemType, data, event)
     

    switch (itemType) {
      case 'performance':
        if (!placesFirst) {
          FormActions.getPlaces(data)
        }
        break;
      case 'place':
        if (placesFirst) {
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
          gotoNext={this.gotoNext.bind(this)}
          gotoPrevious={this.gotoPrevious.bind(this)}
        >
          <ReservationForm
            step={this.state.steps.current}
            currents={this.state.currents}
            choices={this.state.choices}
            onChange={this.onChangeFormData.bind(this)}
            onMakeReservation={this.makeReservation.bind(this)}
            errors={this.state.errors}
          />
        </Stepper>
      </div>
    )
  }


}
