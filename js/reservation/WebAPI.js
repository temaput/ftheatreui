import ServerActions from './actions/ServerActionCreators.js';
import Queries from './Queries.js';
import {DocumentIds} from './constants.js';
import {sendXHR} from '../utils/utils.js';


class WebAPI {
  runQuery(queryName, variables, fieldListing, action) {
    const query = Queries[queryName](variables, fieldListing);
    sendXHR(query).then(
      function(response) {
        action(response.data)
      },
      function(error) {
        throw(error);
      }
    );
  }
}
export default new WebAPI();
