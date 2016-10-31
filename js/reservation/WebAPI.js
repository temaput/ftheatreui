import ServerActions from './actions/ServerActionCreators.js';
import Queries from './Queries.js';
import {DocumentIds} from './constants.js';
import {sendXHR} from '../utils/utils.js';


class WebAPI {
  getFormFields() {
  }
  getFormSteps() {
  }
  getPerformances(placeId) {
    const data = (
      placeId ? Queries.performancesByPlace: Queries.scheduledPerformances
    );

    sendXHR(data(placeId)).then(
      function(response) {
        ServerActions.receiveData('performance', response.data)
      },
      function(error) {
        throw(error);
      }
    );
  }
  getPlaces(performanceId) {
    const data = (
      performanceId ? Queries.placesByPerformance:
        Queries.scheduledPlaces
    );

    sendXHR(data(performanceId)).then(
      function(response) {
        ServerActions.receiveData('place', response.data);
      },
      function(error) {
        throw(error);
      }
    );
  }
  getShows(performanceId, placeId, showDate) {
    const data = Queries.getShowsByPPAndDate;
    sendXHR(data(performanceId, placeId, showDate)).then(
      function(response) {
        ServerActions.receiveData('show', response.data);
      },
      function(error) {
        throw(error);
      }
    );
  } 
}
export default new WebAPI();
