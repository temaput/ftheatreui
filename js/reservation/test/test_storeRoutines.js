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
    const testSample = {
      place: 3,
      email: 'tt@mail.ru',
      childrenSeats: 2,
    };

    it('sets value of place/email/childSeats field', function() {
      Object.keys(testSample).forEach(fname =>
        store.setItem({itemType: fname, data: testSample[fname]})
      );
      Object.keys(testSample).forEach(fname => {
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
        store.receiveItems({itemType: fname, items: testSample})
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
      assert.deepEqual(fields, store.getFields(), "Provide fields");
    });
    it('provides steps', function() {
      assert.deepEqual(steps, store.getSteps(), "Provide steps");
    });

  });


  describe('Manipulate steps', function() {
    it('shifts from first step to second', function() {
      store.gotoNext();
      const currentStep = dtr.getCurrentStep(steps);
      assert.strictEqual(currentStep.number, 2, "current step is second");
    });
    it('shifts from second back to first', function() {
      store.gotoPrevious();
      const currentStep = dtr.getCurrentStep(steps);
      assert.strictEqual(currentStep.number, 1, "current step is first");
    });
    it('does not go to previous from first', function() {
      store.gotoPrevious();
      const currentStep = dtr.getCurrentStep(steps);
      assert.strictEqual(currentStep.number, 1, "current step is first");
    });
  });

  describe('Provide errors to components (form)', function() {
    const errors = {
      place: "Place error",
      email: "Email error",
      childrenSeats: "Children seats error",
    }
    const cleanErrors = {
      place: null,
      email: null,
      childrenSeats: null,
    }
    it('provides errors on place/email/childrenSeats', function() {
      store.processFormValidation({errors: errors});
      Object.keys(errors).forEach(fname => {
        const field = dtr.getFieldById(fields, fname);
        assert.strictEqual(field.error, errors[fname], "Error is in place");
      });
    });
    it('clears errors on place/email/childrenSeats', function() {
      store.processFormValidation({errors: errors});
      Object.keys(errors).forEach(fname => {
        const field = dtr.getFieldById(fields, fname);
        assert.strictEqual(field.error, errors[fname], "Error is in place");
      });
      store.processFormValidation({errors: cleanErrors});
      Object.keys(cleanErrors).forEach(fname => {
        const field = dtr.getFieldById(fields, fname);
        assert.isNull(field.error, "Error is cleaned");
      });
    });
    it('does nothing if empty errors dict supplied', function() {
      store.processFormValidation({errors: errors});
      Object.keys(errors).forEach(fname => {
        const field = dtr.getFieldById(fields, fname);
        assert.strictEqual(field.error, errors[fname], "Error is in place");
      });
      store.processFormValidation({errors: cleanErrors});
      Object.keys(cleanErrors).forEach(fname => {
        const field = dtr.getFieldById(fields, fname);
        assert.isNull(field.error, "Error is cleaned");
      });
      store.processFormValidation({errors: cleanErrors});
      Object.keys(cleanErrors).forEach(fname => {
        const field = dtr.getFieldById(fields, fname);
        assert.isNull(field.error, "Error is cleaned");
      });
    });
  });

});
