import Dispatcher from './Dispatcher.js';
import {ActionTypes} from './constants.js';
import {
  getCurrentStep, getNextStep, getPreviousStep, getFieldById
} from './dataTraversing.js';

import events  from 'events';

const CHANGE_EVENT = 'change';


class Store extends events.EventEmitter {
  constructor(storage) {
    super();
    this._dataStore = storage;

    Dispatcher.register(action => {
      switch(action.type) {
        case ActionTypes.CHANGE_FORM_DATA:
          this.setItem(action);
          break;
        case ActionTypes.MAKE_RESERVATION:
          break;
        case ActionTypes.RECEIVE_DATA:
          this.receiveItems(action);
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
          this.processFormValidation(action);
          break;
        default:
          //no op
      }
    });

  }

  processFormValidation({errors}) {

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
    const {steps} = this._dataStore;
    const currentStep = getCurrentStep(steps);
    const nextStep = getNextStep(steps);
    if (nextStep && currentStep) {
      currentStep.isCurrent = false;
      currentStep.isComplete = true;
      nextStep.isCurrent = true;
      this.emitChange();
    }

  }

  gotoPrevious() {
    const {steps} = this._dataStore;
    const currentStep = getCurrentStep(steps);
    const previousStep = getPreviousStep(steps);
    if (currentStep && previousStep) {
      currentStep.isCurrent = false;
      previousStep.isCurrent = true;
      previousStep.isComplete = false;
      this.emitChange();
    }
  }

  setItem({itemType, data}) {
    const field = this.getFieldById(itemType);
    field.value = data;
    if (field.showChanger) {
      this.getFieldById('show').choicesObsolete = true;
    }
    this.emitChange();
  }


  receiveItems({itemType, items}) {
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
    return getFieldById(this._dataStore.fields, id) 
  }

  getFields() {
    return this._dataStore.fields
  }
  getSteps() {
    return this._dataStore.steps
  }

}

export default Store;
