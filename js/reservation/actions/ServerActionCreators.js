import {ActionTypes} from '../constants.js';
import Dispatcher from '../Dispatcher.js';

const ServerActions = {

  receivePrescribedData(prescribedData) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_PRESCRIBED_DATA,
      prescribedData: prescribedData,
    });
  },

  receiveData(itemType, items) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_DATA,
      itemType: itemType,
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
