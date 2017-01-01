import chai from 'chai';
import chaiString from 'chai-string';
import {fieldListing} from '../Queries.js';

chai.use(chaiString);
const {assert} = chai;

describe('Generate fieldListing', function() {
  const mock = `
    performance { ...field, ...options }
    place { ...field, ...options }
    show { ...field, ...options }
  `;
  const fieldsList = ['performance', 'place', 'show'];
  const fragmentList = ['field', 'options'];
  it('generates fieldListing', function() {
    assert.equalIgnoreSpaces(
      fieldListing(fieldsList, fragmentList), mock, 'fieldListing OK'
    );
  });
});
