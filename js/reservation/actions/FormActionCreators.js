import {ActionTypes} from '../constants.js';
import Dispatcher from '../Dispatcher.js';
import WebAPI from '../WebAPI.js';

const FormActions = {

  getReservationForm(variables) {
    WebAPI.getReservationForm(variables)
  },
  getScheduleFilter(variables) {
    WebAPI.getScheduleFilter(variables)
  },
  changeFormData(itemType, data, event) {
    Dispatcher.dispatch({
      type: ActionTypes.CHANGE_FORM_DATA,
      itemType,
      data,
      event
    });
  },

  getPerformances(placeId=null) {
    WebAPI.getPerformances(placeId);
  },

  getPlaces(performanceId=null) {
    WebAPI.getPlaces(performanceId);
  },

  getShows(performanceId, placeId, showDate=Date()) {
    WebAPI.getShows(performanceId, placeId, showDate);
  },

  getPrescribedData() {
    WebAPI.getPrescribedData()
  },

  makeReservation(reservationData) {
    Dispatcher.dispatch({
      type: ActionTypes.MAKE_RESERVATION,
      reservationData: reservationData
    })
    WebAPI.makeReservation(reservationData);
  },

  gotoNext() {
    Dispatcher.dispatch({
      type: ActionTypes.NEXT_STAGE
    })
  },

  gotoPrevious() {
    Dispatcher.dispatch({
      type: ActionTypes.PREVIOUS_STAGE,
    })
  },

  formValidation(errors={}) {
    Dispatcher.dispatch({
      type: ActionTypes.FORM_VALIDATION,
      errors: errors,
    })
  },
};
export default FormActions;
