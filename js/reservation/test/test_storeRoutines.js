import { assert } from 'chai';
import {dataStore} from './fixture.js';
import * as dtr from '../dataTraversing.js';
import Store from '../Store.js';

describe('Manipulating data in Store', function() {
  let store, fields, steps;

  beforeEach(function() {
    const _dataStore = Object.assign({}, dataStore);
    store = new Store(_dataStore);
    fields = _dataStore.fields;
    steps = _dataStore.steps;
  });

  describe('Set item value', function() {
    const fnames = ['place',  'email', 'childrenSeats']
    const testSample = {
      place: 3,
      email: 'tt@mail.ru',
      childSeats: 2,
    };

    it('sets value of place/email/childSeats field', function() {
      fnames.forEach(fname =>
        store.setItem({itemType: fname, data: testSample[fname]})
      );
      fnames.forEach(fname => {
        const field = dtr.getFieldById(fields, fname);
        assert.strictEqual(field.value, testSample[fname], 
          "value is set appropriately");
      });
    });
  });

  describe('Update choices with new data from server', function() {
    const testSample = {
      place: [1, 2, 3],
      performance: [11, 22, 33],
      show: [555, 444, 333, 222, 111],
    };
    const fnames = Object.keys(testSample);
    it('updates choices of places/performances/shows', function() {
      fnames.forEach(fname =>
        store.receiveItems({itemType: fname, items: testSample[fname]})
      );
      fnames.forEach(fname => {
        const field = dtr.getFieldById(fields, fname);
        assert.isOk(field.options);
        assert.deepEqual(field.options, testSample[fname]);
      });

    });
  });

  describe('Provide fields and steps to components', function() {
    it('provides fields', function() {
    });
    it('provides steps', function() {
    });

  });


  describe('Manipulate steps', function() {
    it('shifts from first step to second', function() {
    });
    it('shifts from second back to first', function() {
    });
    it('does not go to previous from first', function() {
    });
  });

});
