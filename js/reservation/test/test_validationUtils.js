import jsdom from 'jsdom';
import { assert } from 'chai';
import {formMock, formMockId} from './fixture.js';
import {validateFormField} from '../validationUtils.js';

const ERROR_TYPES = {
  patternMismatch: 'patternMismatch',
  valueMissing: 'valueMissing',
  typeMismatch: 'typeMismatch',
  none: 'none',
}

function fillInput(form, errorType=ERROR_TYPES.none) {

  const email = form.elements.email;
  const testSample = {
    email: {
      typeMismatch: 'asdf',
      valueMissing: '',
      none: 'tt@mail.ru',
    },
  }
  email.value = testSample.email[errorType];
}

describe('Validating fields', function() {
  const doc = jsdom.jsdom(formMock);
  global.document = doc;
  global.window = doc.defaultView;
  const hyper = require('hyperform');
  const wrapper = hyper(doc.defaultView);

  describe('Validating email field', function() {
    const form = doc.getElementById(formMockId);
    const email = form.elements.email;
    const customErrorMessages = {
      valueMissing: "Обязательно введите адрес электронной почты",
      typeMismatch: "Введен неверный адрес электронной почты",
    }
    it('brings no error on valid input', function() {
      fillInput(form);
      const errorMsg = validateFormField(email);
      assert.isNull(errorMsg, "No error should be provided");
    });
    it('brings typeMismatch/valueMissing errors', function() {
      [ERROR_TYPES.valueMissing, ERROR_TYPES.typeMismatch].forEach(
        errorType => {
          fillInput(form, errorType);
          const errorMsg = validateFormField(email);
          assert.isOk(errorMsg, "Some error should be provided");
          assert.isString(errorMsg, "Error msg is string");
        }
      );
    });
    it('brings custom errors on typeMismatch/valueMissing', function() {
      [ERROR_TYPES.valueMissing, ERROR_TYPES.typeMismatch].forEach(
        errorType => {
          fillInput(form, errorType);
          const errorMsg = validateFormField(email, customErrorMessages);
          assert.isOk(errorMsg, "Some error should be provided");
          assert.isString(errorMsg, "Error msg is string");
          assert.strictEqual(errorMsg, customErrorMessages[errorType]);
        }
      );
    });
  });


});
