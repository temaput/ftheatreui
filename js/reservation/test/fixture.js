export const dataStore = {
  ScheduleFilterForm: {
    fields: [
      {
        id: 'performance',
        value: "1",
      },
      {
        id: 'place',
        options: [],
        value: "2",
        required: true,
        label: 'Выберите спектакль',
        error: null,
        customErrorMessages: {valueMissing: 'Обязательно выберите площадку'},
      },
    ],
  },
  ShowSelect: {
    fields: [
      {
        id: 'show',
        options: [],
        value: "3",
        required: true,
        label: 'Выберите показ',
        error: null,
        customErrorMessages: {valueMissing: 'Обязательно выберите показ'},
      },
    ],
  },
  ReservationForm: {
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
      },
      {
        id: 'adultSeats', value: 1, type: "number", label: "Взрослые",
      }
    ],
  },
  steps: [
    {
      number: 1,
      isCurrent: true,
      isComplete: false,
      label: "Выберите сеанс",
      hasFinish: false,
      hasPrevious: false,
      data: [
        'ScheduleFilterForm',
        'ShowSelect',
      ],
      hiddenFields: [
        'performance',
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
        'ReservationForm',
      ],
      hiddenFields: [
        'show', 'childrenSeats', 'adultSeats'
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
        'ReservationForm',
      ],
      hiddenFields: [
        'show', 'email', 'tel', 'firstName', 'lastName',
      ],
    },
  ],
}

export const formMock = `
<html>
  <body>
    <form action="#" id="mock-form">
      <div>
        <label htmlFor="email"></label>
        <input id="email" type="email" required>
      </div>
    </form>
  </body>
</html>
`;
export const formMockId = 'mock-form';
