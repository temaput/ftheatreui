import Dispatcher from './Dispatcher.js';
import {ActionTypes} from './constants.js';
import {
  getCurrentStep, getNextStep, getPreviousStep, getFieldById
} from './dataTraversing.js';

import events  from 'events';

const CHANGE_EVENT = 'change';

const _dataStore = {
  fields: [
    {
      id: 'performance',
      hidden: true,
      value: "",
      customProps: {
        stepNumber: 1,
        isFixed: true,
        isShowChanger: true,
      },
    },
    {
      id: 'place',
      options: [],
      value: "",
      required: true,
      label: 'Выберите спектакль',
      error: null,
      customProps: {
        stepNumber: 1,
        isFixed: false,
        isShowChanger: true,
      },
      customErrorMessages: {valueMissing: 'Обязательно выберите площадку'},
    },
    {
      id: 'show',
      options: [],
      value: "",
      required: true,
      label: 'Выберите показ',
      error: null,
      customProps: {
        stepNumber: 1,
        isFixed: false,
        choicesObsolete: false,
      },
      customErrorMessages: {valueMissing: 'Обязательно выберите показ'},
    },
    {
      id: 'email', label: "email", type: "email", required: true,
      value: "",
      customProps: {
        stepNumber: 2,
      },
    }, 
    {
      id: 'firstName', label: "Имя",
      value: "",
      customProps: {
        stepNumber: 2,
      },
    },
    {
      id: 'lastName', label: "Фамилия",
      value: "",
      customProps: {
        stepNumber: 2,
      },
    },
    {
      id: 'tel', label: "Мобильный телефон", pattern: "[\d]{5,20}",
      value: "",
      customProps: {
        stepNumber: 2,
      },
    }, 
    {
      id: 'childrenSeats', value: 1, type: "number", label: "Дети",
      customProps: {
        stepNumber: 3,
      },
    },
    {
      id: 'adultSeats', value: 1, type: "number", label: "Взрослые",
      customProps: {
        stepNumber: 3,
      },
    }
  ],
  steps: [
    {
      number: 1,
      isCurrent: true,
      isComplete: false,
      label: "Выберите сеанс",
      hasFinish: false,
      hasPrevious: false,
    },
    {
      number: 2,
      isCurrent: false,
      isComplete: false,
      label: "Укажите контактные данные",
      hasFinish: false,
      hasPrevious: true,
    },
    {
      number: 3,
      isCurrent: false,
      isComplete: false,
      label: "Подтверждение брони",
      hasFinish: true,
      hasPrevious: true,
    },
  ],
}


class Store extends events.EventEmitter {
  constructor(props) {
    super(props);

    Dispatcher.register(action => {
      switch(action.type) {
        case ActionTypes.CHANGE_FORM_DATA:
          this.setItem(action);
          break;
        case ActionTypes.MAKE_RESERVATION:
          break;
        case ActionTypes.RECEIVE_DATA:
          this.receiveItems(action.itemType, action.items);
          break;
        case ActionTypes.RECEIVE_RESERVATION_RESPONCE:
          break;
        case ActionTypes.NEXT_STAGE:
            this.gotoNext()
          break;
        case ActionTypes.PREVIOUS_STAGE:
          this.gotoPrevious()
          break;
        case ActionTypes.FORM_VALIDATION:
          this.processFormValidation(action.errors);
          break;
        default:
          //no op
      }
    });

  }

  processFormValidation(errors) {

    Object.keys(errors).forEach(
      fname => {
        const field = this.getFieldById(fname);
        field.error = errors[fname];
      }
    );
    this.emitChange();
  }

  emitChange() {
    this.emit(CHANGE_EVENT)
  }

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  
  gotoNext() {
    const {steps} = _dataStore;
    const currentStep = getCurrentStep(steps);
    const nextStep = getNextStep(steps);
    currentStep.isCurrent = false;
    currentStep.isComplete = true;
    nextStep.isCurrent = true;

    this.emitChange();
  }

  gotoPrevious() {
    const {steps} = _dataStore;
    const currentStep = getCurrentStep(steps);
    const previousStep = getPreviousStep(steps);
    currentStep.isCurrent = false;
    previousStep.isCurrent = true;
    previousStep.isComplete = false;
    this.emitChange();
  }

  setItem({itemType, data, event}) {
    const field = this.getFieldById(itemType);
    field.value = data;
    if (field.showChanger) {
      this.getFieldById('show').choicesObsolete = true;
    }
    if (event) {
      this.validateFormField(field, event.target);
    }
    this.emitChange();
  }


  receiveItems(itemType, items) {
    const field = this.getFieldById(itemType);
    field.options = items[itemType];
    //check that we can preserve our current among new choices
    if (field.value &&
          field.options.every(el => el !== field.value)
    ) {
      field.value = null
    }
    if (itemType === 'show') {
      this.getFieldById('show').choicesObsolete = false;
    }
    this.emitChange();
  }


  getFieldById(id) {
    return getFieldById(_dataStore.fields, id) 
  }

  getFields() {
    return _dataStore.fields
  }
  getSteps() {
    return _dataStore.steps
  }

}

export default new Store();
