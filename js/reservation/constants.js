export const ActionTypes =  {
  CHOOSE_ITEM: 'CHOOSE_ITEM',
  MAKE_RESERVATION: 'MAKE_RESERVATION',
  RECEIVE_DATA: 'RECEIVE_DATA',
  RECEIVE_RESERVATION_RESPONCE: 'RECEIVE_RESERVATION_RESPONCE',
  RECEIVE_PRESCRIBED_DATA: 'RECEIVE_PRESCRIBED_DATA',
  NEXT_STAGE: 'NEXT_STAGE',
  PREVIOUS_STAGE: 'PREVIOUS_STAGE',
  CHANGE_FORM_DATA: 'CHANGE_FORM_DATA',
  FORM_VALIDATION: 'FORM_VALIDATION',
}

export const DocumentIds = {
  ROOT_ELEMENT: 'reservation-main',
  PRESCRIBED_DATA: 'reservation-prescribed-data',
}

export const FilterModes = {
  performanceFirst: {
    name: 'performanceFirst',
    'stepByStep': true,
    'performanceFirst': true,
    'dateFilter': null,
    'selectShow': true,
  },
  placeFirst: {
    name: 'placeFirst',
    'stepByStep': true,
    'performanceFirst': false,
    'dateFilter': null,
    'selectShow': true,
  },
  fullOptions: {
    name: 'fullOptions',
    'stepByStep': false,
    'performanceFirst': false,
    'dateFilter': null,
    'selectShow': false,
  },
}

FilterModes.default = FilterModes.performanceFirst;

