import Dispatcher from './Dispatcher.js';
import {ActionTypes} from './constants.js';

import events  from 'events';

const CHANGE_EVENT = 'change';

const _status = {
  showsUpdated: false,
};

const _steps = {
  current: 1,
  total: 3,
  names: [
    "Выберите сеанс", "Укажите контактные данные", "Подтверждение брони"
  ],
}

const _choices = {
};

const _currents = {
};

let _errors = {};

class Store extends events.EventEmitter {
  constructor(props) {
    super(props);

    Dispatcher.register(action => {
      switch(action.type) {
        case ActionTypes.CHANGE_FORM_DATA:
          this.setCurrentItem(action);
          break;
        case ActionTypes.MAKE_RESERVATION:
          break;
        case ActionTypes.RECEIVE_PERFORMANCES:
          this.receiveItems('performance', action.items);
          break;
        case ActionTypes.RECEIVE_PLACES:
          this.receiveItems('place', action.items);
          break;
        case ActionTypes.RECEIVE_SHOWS:
          this.receiveItems('show', action.items);
          break;
        case ActionTypes.RECEIVE_RESERVATION_RESPONCE:
          break;
        case ActionTypes.NEXT_STAGE:
          if (this.validateCurrentStage()) {
            this.gotoNext()
          }
          break;
        case ActionTypes.PREVIOUS_STAGE:
          this.gotoPrevious()
          break
        default:
          //no op
      }
    });

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

  validateCurrentStage() {
    const emptyMsg = "Необходимо заполнить это поле";
    const {performance, place, show, email} = _currents;
    let hasErrors = false;
    _errors = {};
    switch(_steps.current) {
      case 1:
        if (!performance) {
          _errors.performance = emptyMsg;
          hasErrors = true;
        }
        if (!place) {
          _errors.place = emptyMsg;
          hasErrors = true;
        }
        if (!show) {
          _errors.show = emptyMsg;
          hasErrors = true;
        }
        break;
      case 2:
        if (!email) {
          _errors.email = emptyMsg;
          hasErrors = true;
        }
        break;
      case 3:
        break;
      default:
        //no op
      }
    if (hasErrors) {
      this.emitChange();
    }
    return !hasErrors;
  }

  gotoNext() {
    _steps.current++;
    this.emitChange();
  }
  gotoPrevious() {
    _steps.current--;
    this.emitChange();
  }

  setCurrentItem({itemType, data, event}) {
    _currents[itemType] = data;
    const showChangers = ['performance', 'place'];
    if (showChangers.some(i => i === itemType)) {
      _status.showsUpdated = false;
    }
    if (event) {
      this.validateFormField(itemType, event.target);
    }
    this.emitChange();
  }

  validateFormField(fieldId, field) {
    if (field.validity && !field.validity.valid) {
      _errors[fieldId] = this.getErrorMessage(fieldId, field.validity)
    }
  }

  getErrorMessage(fieldId, validity) {
    const customMessages = [
      {test: ['email'], msg: "Укажите правильный email"},
      {test: ['performance', 'place'], msg: "Обязательно выберите спектакль/площадку"},
    ];
    const msg = customMessages.find(item => item.test.some(
      test => test === fieldId
    ));
    return msg ? msg.msg: validity.validationMessage;
  }

  receiveItems(itemType, items) {
    _choices[itemType] = items[itemType];
    //check that we can preserve our current among new choices
    if (
      _currents[itemType] &&
      _choices[itemType].every(el => el !== _currents[itemType])
    ) {
      _currents[itemType] = undefined
    }
    if (itemType === 'show') {
      _status.showsUpdated = true
    }
    this.emitChange();
  }

  getChoices() {
    return {..._choices};
  }
  getCurrents() {
    return {..._currents};
  }
  getStatus() {
    return {..._status};
  }
  getErrors() {
    return {..._errors}
  }
  getSteps() {
    return {..._steps};
  }

}

export default new Store();
