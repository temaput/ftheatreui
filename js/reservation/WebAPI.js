import ServerActions from './actions/ServerActionCreators.js';
import Queries from './Queries.js';
import {DocumentIds} from './constants.js';
import {sendXHR} from '../utils/utils.js';


class WebAPI {
  runQuery(query) {
    sendXHR(query).then(
      function(response) {
        return response.data
      },
      function(error) {
        throw(error);
      }
    );
  }
}
export default new WebAPI();
