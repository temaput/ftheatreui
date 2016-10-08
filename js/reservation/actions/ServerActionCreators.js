import {ActionTypes} from '../constants.js';
import Dispatcher from '../Dispatcher.js';

const ServerActions = {

  receivePrescribedData(prescribedData) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_PRESCRIBED_DATA,
      prescribedData: prescribedData,
    });
  },

  receivePerformances(items) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_PERFORMANCES,
      items: items
    })
  },

  receivePlaces(items) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_PLACES,
      items: items
    })
  },

  receiveShows(items) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_SHOWS,
      items: items
    })
  },

  receiveReservationResponce(response) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_RESERVATION_RESPONCE,
      response: response
    })
  },
}

export default ServerActions;
