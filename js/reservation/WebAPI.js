import ServerActions from './actions/ServerActionCreators.js';
import Queries from './Queries.js';
import {DocumentIds} from './constants.js';
import {sendXHR} from '../utils/utils.js';


class WebAPI {
  getPerformances(placeId) {
    const data = (
      placeId ? Queries.performancesByPlace: Queries.scheduledPerformances
    );

    sendXHR(data(placeId)).then(
      function(response) {
        ServerActions.receivePerformances(response.data)
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
        ServerActions.receivePlaces(response.data);
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
        ServerActions.receiveShows(response.data);
      },
      function(error) {
        throw(error);
      }
    );
  } 
}
export default new WebAPI();
