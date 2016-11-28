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
  PREDEFINED_DATA: 'reservation-predefined-data',
}

export const FormTypes = {
  'ScheduleFilterForm': 'ScheduleFilterForm',
  'ReservationForm': 'ReservationForm',
}

export const Steps = [
  {
    number: 1,
    isCurrent: true,
    isComplete: false,
    label: "Выберите сеанс",
    hasFinish: false,
    hasPrevious: false,
    data: [
      { type: FormTypes.ScheduleFilterForm },
    ],
  },
  {
    number: 2,
    isCurrent: false,
    isComplete: false,
    label: "Укажите контактные данные",
    hasFinish: false,
    hasPrevious: true,
    data: [
      { 
        type: FormTypes.ReservationForm,
        exclude_fields:  [ 'show', 'childrenSeats', 'adultSeats' ]
      },
    ],
  },
  {
    number: 3,
    isCurrent: false,
    isComplete: false,
    label: "Подтверждение брони",
    hasFinish: true,
    hasPrevious: true,
    data: [
      { 
        type: FormTypes.ReservationForm,
        exclude_fields:  [ 'show', 'email', 'tel', 'firstName', 'lastName', ]
      },
    ],
  },
];

