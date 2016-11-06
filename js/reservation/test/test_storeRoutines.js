import { assert } from 'chai';
import {dataStore} from './fixture.js';
import * as dtr from '../dataTraversing.js';
import Store from '../Store.js';

describe('Manipulating data in Store', function() {
  let _dataStore, store,  steps, fields;

  beforeEach(function() {
    _dataStore = JSON.parse(JSON.stringify(dataStore));
    store = new Store(_dataStore);
    steps = _dataStore.steps;
  });

  describe('Set item value', function() {
    const testSample = {
      ScheduleFilterForm: {place: 3},
      ReservationForm: {
        email: 'tt@mail.ru',
        childrenSeats: 2,
      }
    };

    it('sets value of place/email/childSeats field', function() {
      Object.keys(testSample).forEach(objname =>
        Object.keys(testSample[objname]).forEach(fname =>
          store.setItem({
            objType: objname, itemType: fname, data: testSample[objname][fname]
          })
        )
      );
      Object.keys(testSample).forEach(objname =>
        Object.keys(testSample[objname]).forEach(fname => {
          const fields = dtr.getObjectFields(_dataStore, objname);
          const field = dtr.getFieldById(fields, fname);
          assert.strictEqual(field.value, testSample[objname][fname], 
            "value is set appropriately");
        })
      );
    });
  });

  describe('Update choices with new data from server', function() {
    const testSample = {
      ScheduleFilterForm: {
        place: [1, 2, 3],
        performance: [11, 22, 33],
      },
      ShowSelect: {
        show: [555, 444, 333, 222, 111],
      },
    };
    const objnames = Object.keys(testSample);
    it('updates choices of places/performances/shows', function() {
      objnames.forEach(objname =>
        Object.keys(testSample[objname]).forEach(fname =>
          store.receiveItems({objType: objname,
            itemType: fname, items: testSample[objname]})
        )
      );
      objnames.forEach(objname =>
        Object.keys(testSample[objname]).forEach(fname => {
          const fields = dtr.getObjectFields(_dataStore, objname);
          const field = dtr.getFieldById(fields, fname);
          assert.isOk(field.options);
          assert.deepEqual(field.options, testSample[objname][fname]);
        })
      );

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
      email: "Email error",
      childrenSeats: "Children seats error",
    }
    const cleanErrors = {
      email: null,
      childrenSeats: null,
    }
    it('provides errors on place/email/childrenSeats', function() {
      store.processFormValidation({errors: errors});
      Object.keys(errors).forEach(fname => {
        const fields = dtr.getObjectFields(_dataStore, "ReservationForm");
        const field = dtr.getFieldById(fields, fname);
        assert.strictEqual(field.error, errors[fname], "Error is in place");
      });
    });
    it('clears errors on place/email/childrenSeats', function() {
      store.processFormValidation({errors: errors});
      Object.keys(errors).forEach(fname => {
        const fields = dtr.getObjectFields(_dataStore, "ReservationForm");
        const field = dtr.getFieldById(fields, fname);
        assert.strictEqual(field.error, errors[fname], "Error is in place");
      });
      store.processFormValidation({errors: cleanErrors});
      Object.keys(cleanErrors).forEach(fname => {
        const fields = dtr.getObjectFields(_dataStore, "ReservationForm");
        const field = dtr.getFieldById(fields, fname);
        assert.isNull(field.error, "Error is cleaned");
      });
    });
    it('does nothing if empty errors dict supplied', function() {
      store.processFormValidation({errors: errors});
      Object.keys(errors).forEach(fname => {
        const fields = dtr.getObjectFields(_dataStore, "ReservationForm");
        const field = dtr.getFieldById(fields, fname);
        assert.strictEqual(field.error, errors[fname], "Error is in place");
      });
      store.processFormValidation({errors: cleanErrors});
      Object.keys(cleanErrors).forEach(fname => {
        const fields = dtr.getObjectFields(_dataStore, "ReservationForm");
        const field = dtr.getFieldById(fields, fname);
        assert.isNull(field.error, "Error is cleaned");
      });
      store.processFormValidation({errors: cleanErrors});
      Object.keys(cleanErrors).forEach(fname => {
        const fields = dtr.getObjectFields(_dataStore, "ReservationForm");
        const field = dtr.getFieldById(fields, fname);
        assert.isNull(field.error, "Error is cleaned");
      });
    });
  });

  describe('Provide steps and data to components', function() {
    const testSample = [
      [
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
      ],
      [
        {
          type: 'ReservationForm',
          props: {
            fields: [
              {
                id: 'email', label: "email", type: "email", required: true,
                value: "",
              }, 
              {
                id: 'firstName', label: "Имя",
                value: "",
              },
              {
                id: 'lastName', label: "Фамилия",
                value: "",
              },
              {
                id: 'tel', label: "Мобильный телефон", pattern: "[\d]{5,20}",
                value: "",
              }, 
              {
                id: 'childrenSeats', value: 1, type: "number", label: "Дети",
                hidden: true,
              },
              {
                id: 'adultSeats', value: 1, type: "number", label: "Взрослые",
                hidden: true,
              }
            ],
          },
        },
      ],
      [
        {
          type: 'ReservationForm',
          props: {
            fields: [
              {
                id: 'email', label: "email", type: "email", required: true,
                value: "",
                hidden: true,
              }, 
              {
                id: 'firstName', label: "Имя",
                value: "",
                hidden: true,
              },
              {
                id: 'lastName', label: "Фамилия",
                value: "",
                hidden: true,
              },
              {
                id: 'tel', label: "Мобильный телефон", pattern: "[\d]{5,20}",
                value: "",
                hidden: true,
              }, 
              {
                id: 'childrenSeats', value: 1, type: "number", label: "Дети",
              },
              {
                id: 'adultSeats', value: 1, type: "number", label: "Взрослые",
              }
            ],
          },
        },
      ],
    ]
    it('provides steps', function() {
      assert.deepEqual(steps, store.getSteps(), "Provide steps");
    });
    it('provides stepObjects for each step ', function() {
      assert.deepEqual(store.getData(), testSample[0], "Provide objects 1");
      store.gotoNext();
      assert.deepEqual(store.getData(), testSample[1], "Provide objects 2");
      store.gotoNext();
      assert.deepEqual(store.getData(), testSample[2], "Provide objects 3");
    });
  });
});
