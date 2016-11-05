import { assert } from 'chai';
import {dataStore} from './fixture.js';
import * as dtr from '../dataTraversing.js';

describe('Traversing data store', function() {

  let _dataStore, steps=1;

  beforeEach(function() {
    _dataStore = Object.assign({}, dataStore);
    steps = _dataStore.steps;
  });

  describe('getting field by object/id', function() {
    it('should get field by its id', function() {
      const scheduleFilterFormFields = dtr.getObjectFields(
        _dataStore, "ScheduleFilterForm");
      const performanceField = dtr.getFieldById(
        scheduleFilterFormFields, 'performance'
      );
      assert.isOk(performanceField, "Should be truthy");
      assert.equal(performanceField.id, 'performance',
        'Should have the very same id');
    });
  });
  describe(
    'getting filter fields', 
    function() {
      it('should get place, performance and show as fields', function() {
        const {place, performance} = dtr.getFilterFields(_dataStore);
        assert.isOk(place, "Place is ok");
        assert.isOk(performance, "Performance is ok");
      });
      it('should get corresponding values', function() {
        const filterFields = dtr.getFilterFields(_dataStore);
        const filterFieldsValues = dtr.getFilterFieldsValues(_dataStore);
        Object.keys(filterFields).forEach(
          fname => assert.equal(
            filterFields[fname].value,
            filterFieldsValues[fname],
            "Values should match correspondingly"
          )
        );
      });
    }
  );
  describe(
    'getting current step number and objects',
    function() {
      it('should get first step as current', function() {
        const currentStep = dtr.getCurrentStep(steps);
        assert.equal(currentStep.number, 1, 'current step is first');
      });
      it('should get second step as next', function() {
        const nextStep = dtr.getNextStep(steps);
        assert.equal(nextStep.number, 2, 'next step is second');
      });
      it('should get falsy as previous', function() {
        const previousStep = dtr.getPreviousStep(steps);
        assert.isNotOk(previousStep, 'no previous step');
      });
      
    }
  );

  describe(
    'getting step objects and fields',
    function() {
      const firstStepObjectsSample = [
        {
          type: 'ScheduleFilterForm',
          props: {
            fields: [
              {
                id: 'performance',
                hidden: true,
                value: "1",
              },
              {
                id: 'place',
                options: [],
                value: "2",
                required: true,
                label: 'Выберите спектакль',
                error: null,
                customErrorMessages: {
                  valueMissing: 'Обязательно выберите площадку'
                },
              },
            ],
          },
        },
        {
          type: 'ShowSelect',
          props: {
            fields: [
              {
                id: 'show',
                options: [],
                value: "3",
                required: true,
                label: 'Выберите показ',
                error: null,
                customErrorMessages: {
                  valueMissing: 'Обязательно выберите показ'
                },
              },
            ],
          }
        },
      ]
      it('should get first field objects (ScheduleFilterForm/ShowSelect)', 
        function() {
          const currentStepObjects = dtr.getCurrentStepObjects(_dataStore);
          assert.lengthOf(currentStepObjects, 2, "should be 2 objects");
          assert.deepEqual(firstStepObjectsSample, currentStepObjects,
            "first step objects ok");
        }
      );
    }
  );


});
