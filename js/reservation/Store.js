import Dispatcher from './Dispatcher.js';
import {ActionTypes} from './constants.js';
import {
  getCurrentStep, getNextStep, getPreviousStep, getObjectFields, getFieldById,
    getCurrentStepObjects,
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
        const field = this.getFieldById('ReservationForm', fname);
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

  setItem({objType, itemType, data}) {
    const field = this.getFieldById(objType, itemType);
    field.value = data;
    this.emitChange();
  }


  receiveItems({objType, itemType, items}) {
    const field = this.getFieldById(objType, itemType);
    field.options = items[itemType];
    field.value = null;
    this.emitChange();
  }


  getFieldById(objName, id) {
    const fields = getObjectFields(this._dataStore, objName);
    return getFieldById(fields, id) 
  }

  getData() {
    return getCurrentStepObjects(this._dataStore);
  }

  getSteps() {
    return [...this._dataStore.steps]
  }

}

export default Store;
