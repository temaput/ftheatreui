import { assert } from 'chai';
import {dataStore} from './fixture.js';
import * as dtr from '../dataTraversing.js';

describe('Traversing data store', function() {
  const {fields, steps} = dataStore;
  describe('getting field by id', function() {
    it('should get field by its id', function() {
      const performanceField = dtr.getFieldById(fields, 'performance');
      assert.isOk(performanceField, "Should be truthy");
      assert.equal(performanceField.id, 'performance',
        'Should have the very same id');
    });
  });
  describe(
    'getting filter fields', 
    function() {
      it('should get place, performance and show as fields', function() {
        const {place, performance, show} = dtr.getFilterFields(fields);
        assert.isOk(place, "Place is ok");
        assert.isOk(performance, "Performance is ok");
        assert.isOk(show, "Show is ok");
      });
      it('should get corresponding values', function() {
        const filterFields = dtr.getFilterFields(fields);
        const filterFieldsValues = dtr.getFilterFieldsValues(fields);
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
    'getting current step number and fields',
    function() {
      const currentStep = dtr.getCurrentStep(steps);
      const nextStep = dtr.getNextStep(steps);
      const previousStep = dtr.getPreviousStep(steps);
      it('should get first step as current', function() {
        assert.equal(currentStep.number, 1, 'current step is first');
      });
      it('should get second step as next', function() {
        assert.equal(nextStep.number, 2, 'next step is second');
      });
      it('should get falsy as previous', function() {
        assert.isNotOk(previousStep, 'no previous step');
      });
      it('should get performance, place and show as current step fields', 
        function() {
          const currentStepFields = dtr.getCurrentStepFields(steps, fields);
          assert.lengthOf(currentStepFields, 3, "should be 3 fields");
          assert(
            currentStepFields.every(
              f => ['performance', 'place', 'show'].some(
                fname => fname === f.id)
            ),
            "fields must be performance/place/show"
          );
        }
      );
      
    }
  );

  describe(
    'grouping fields by steps',
    function() {
      const testSample = [
        {stepNumber: 1, fieldNames: ['performance', 'place', 'show']},
        {stepNumber: 2, fieldNames: ['email', 'firstName', 'lastName', 'tel']},
        {stepNumber: 3, fieldNames: ['childrenSeats', 'adultSeats']},
      ]
      it('should compile appropriate structure', function() {
        const fieldsBySteps = dtr.groupFieldsBySteps(steps, fields);
        const test = fieldsBySteps.map(
          stepFields => ({
            stepNumber: stepFields.step.number,
            fieldNames: stepFields.fields.map(
              field => field.id
            ),
          })
        );
        assert.deepEqual(test, testSample, 'structure is appropriate');
      });
    }
  );


});
